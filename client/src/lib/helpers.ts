import {
  Payload,
  PaymentFormType,
  VTDATA,
  ViewRequestedResponse,
  ViewRequestedT,
} from "@/types/types";

import { ToWords } from "to-words";

/**
 * Formats a number with commas and decimal places
 *
 * @param number - Number to format
 * @returns A styled number to be displayed on the invoice
 */
const formatNumberWithCommas = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getCurrencyName = (code: string): string => {
  switch (code) {
    case "AED":
      return "Dirham";
    case "DKK":
      return "Danish Krone";
    case "EUR":
      return "Euro";
    case "GBP":
      return "Pound";
    case "JPY":
      return "Yen";
    case "SEK":
      return "Swedish Krone";
    case "USD":
      return "Dollar";
    case "THB":
      return "Baht";
    case "SAR":
      return "Riyal";
    case "KRW":
      return "Won";
    default:
      return "Unknown Currency";
  }
};

const mergeItemsAttachments = (
  dataObject: PaymentFormType,
  payload: Payload
): PaymentFormType => {
  Object.keys(payload).forEach((key) => {
    if (key.startsWith("items[")) {
      const index = parseInt(key.match(/\d+/)![0], 10);
      if (!isNaN(index) && dataObject.items[index]) {
        dataObject.items[index].attachments = payload[key];
      }
    }
  });

  return dataObject;
};

const groupArray = (arr: ViewRequestedT[]) => {
  return Object.values(
    arr.reduce((acc, obj) => {
      const {
        REQNO,
        REQDATE,
        REQLOCNAME,
        REQTYPENAME,
        REQCURRCODE,
        REQVATPERC,
        RESTATUS,
        REQAMOUNT,
        REQBPCODE,
        REQUSERID,
        REQUSERNAME,
        REQMODENAME,
        TOTALAMT,
      } = obj;
      const key = REQNO;

      if (!acc[key]) {
        acc[key] = {
          REQUSERID,
          REQNO,
          REQDATE,
          REQLOCNAME,
          REQTYPENAME,
          REQCURRCODE,
          RESTATUS,
          REQVATPERC,
          REQAMOUNT,
          REQBPCODE,
          REQUSERNAME,
          REQMODENAME,
          TOTALAMT,
        };
      } else {
        acc[key].REQAMOUNT += REQAMOUNT;
      }

      return acc;
    }, {} as Record<number, VTDATA>)
  );
};

const calculateTotalAmount = (obj: VTDATA): string => {
  const { REQAMOUNT, REQVATPERC } = obj;
  const vatPercentage = parseFloat(REQVATPERC);
  const totalAmount = REQAMOUNT + (vatPercentage / 100) * REQAMOUNT;
  return formatNumberWithCommas(totalAmount);
};

const calculateNetAmount = (arr: ViewRequestedT[]): string => {
  const netamount = arr.reduce((sum, arr) => sum + arr.REQAMOUNT, 0);
  return formatNumberWithCommas(netamount);
};

const calculateVatAmount = (arr: ViewRequestedT[]): string => {
  const netamount = arr.reduce((sum, arr) => sum + arr.REQAMOUNT, 0);
  const vatPercentage = parseFloat(arr[0].REQVATPERC);
  const vatAmount = (vatPercentage / 100) * netamount;
  return formatNumberWithCommas(vatAmount);
};

const calculateTotalAmountfromALl = (arr: ViewRequestedT[]): number => {
  const netamount = arr.reduce((sum, arr) => sum + arr.REQAMOUNT, 0);
  const vatPercentage = parseFloat(arr[0].REQVATPERC);
  const totalAmount = netamount + (vatPercentage / 100) * netamount;
  return totalAmount;
};

const filterRequired = (
  data: ViewRequestedT[],
  reqno: number
): ViewRequestedT[] => {
  return data.filter((key) => key.REQNO === reqno);
};

const isWithinRange = (
  row: { original: { REQDATE: string } },
  columnId: unknown,
  value: string[]
) => {
  const dateStr = row?.original.REQDATE as string;
  const [start, end] = value;

  const date = new Date(`${dateStr}T00:00:00Z`); // Set time zone to UTC

  const startUTC = start ? new Date(`${start}T00:00:00Z`) : null;
  const endUTC = end ? new Date(`${end}T23:59:59Z`) : null;

  if (!date) {
    return false;
  } else if (startUTC && endUTC) {
    const isWithinRange =
      date.getTime() >= startUTC.getTime() &&
      date.getTime() <= endUTC.getTime();
    return isWithinRange;
  } else {
    return true;
  }
};

const countFiles = (jsonString: string): number => {
  if (jsonString === "" || jsonString === "undefined") {
    return 0;
  }
  try {
    const filenames: string[] = JSON.parse(jsonString);
    return filenames.length;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return 0;
  }
};

const handleDownload = (jsonString: string) => {
  try {
    const filenames: string[] = JSON.parse(jsonString);
    filenames.forEach((fileName) => {
      const fileUrl = `${
        import.meta.env.VITE_PUBLIC_BACKEND
      }/uploads/${fileName}`;
      window.open(fileUrl, "_blank");
    });
  } catch (error) {
    console.error("Unable to view the attachment", error);
    return 0;
  }
};

const numberToWords = (currency: string, data: ViewRequestedResponse) => {
  const toWords = new ToWords({
    localeCode: "en-AE",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: getCurrencyName(currency),
        plural: getCurrencyName(currency),
        symbol: currency,
        fractionalUnit: {
          name: "cents",
          plural: "cents",
          symbol: "",
        },
      },
    },
  });

  const totalAmount = calculateTotalAmountfromALl(
    data?.result as ViewRequestedT[]
  );
  return toWords.convert(totalAmount);
};

export {
  formatNumberWithCommas,
  mergeItemsAttachments,
  groupArray,
  calculateTotalAmount,
  filterRequired,
  calculateNetAmount,
  calculateTotalAmountfromALl,
  getCurrencyName,
  isWithinRange,
  countFiles,
  handleDownload,
  calculateVatAmount,
  numberToWords,
};
