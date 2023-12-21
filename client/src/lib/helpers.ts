import { Payload, PaymentFormType } from "@/types/types";

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

export { formatNumberWithCommas, mergeItemsAttachments };
