import { TPAYMENTMODE } from "@/types/types";

export const API_ENDPOINTS = {
  UPLOADIMAGE: "/upload",
  CASHIER: "/procedure/cashier",
  VENDORLIST: "/procedure/vendor-list",
  LOCATION: "/procedure/location",
  PURCHASEORDER: "/procedure/purchase-order",
  PAYMENTMETHOD: "/procedure/payment-method",
  APINVOICE: "/procedure/ap-invoice",
  PAYMENTYPE: "/procedure/payment-type",
  VAT: "/procedure/vat",
  CURRENCY: "/procedure/currency",
  EMPLOYEE: "/procedure/employee",
  COSTCENTERDEPARTMENT: "/procedure/cost-center-department",
  COSTCENTERDIVISON: "/procedure/cost-center-division",
  GLCODE: "/procedure/glcode",
  PRODUCTLINE: "/procedure/product-line",
  CREATEPAYMENTVOUCHER: "/procedure/create-voucher",
  GETREQUESTEDVOUCHERS: "/procedure/get-voucher",
};

export const PAYMENT_MODE: TPAYMENTMODE[] = [
  { modeCode: "CA", modeName: "Cash" },
  { modeCode: "CQ", modeName: "Cheque" },
  { modeCode: "OT", modeName: "Online Transfer" },
  { modeCode: "VCC", modeName: "Virtual Credit Card" },
];
