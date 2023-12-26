import {
  Payload,
  PaymentFormType,
  VTDATA,
  ViewRequestedT,
} from "@/types/types";

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
        REQCANCELED,
        REQAMOUNT,
        REQBPCODE,
      } = obj;
      const key = REQNO;

      if (!acc[key]) {
        acc[key] = {
          REQNO,
          REQDATE,
          REQLOCNAME,
          REQTYPENAME,
          REQCURRCODE,
          REQCANCELED,
          REQVATPERC,
          REQAMOUNT,
          REQBPCODE,
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

export {
  formatNumberWithCommas,
  mergeItemsAttachments,
  groupArray,
  calculateTotalAmount,
  filterRequired,
  calculateNetAmount,
  calculateTotalAmountfromALl,
  getCurrencyName,
};
