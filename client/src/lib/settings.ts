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
  VATCODE: "/procedure/vat",
  CURRENCY: "/procedure/currency",
  EMPLOYEE: "/procedure/employee",
  COSTCENTERDEPARTMENT: "/procedure/cost-center-department",
  COSTCENTERDIVISON: "/procedure/cost-center-division",
  GLCODE: "/procedure/glcode",
  PRODUCTLINE: "/procedure/product-line",
  CREATEPAYMENTVOUCHER: "/procedure/create-voucher",
  GETREQUESTEDVOUCHERS: "/procedure/get-voucher",
  VALIDATECHECKAPPROVER: "/procedure/check-approver",
  GETREQUESTERINFO: "/procedure/requester-info",
  GETSINGLEVOUCHERS: "/procedure/get-single-voucher",
  GETAPPROVER: "/procedure/get-approver",
  GETNEXTAPPROVER: "/procedure/get-next-level-approver",
  HANDLEVOUCHERAPPROVE: "/procedure/voucher-approve",
  HANDLEVOUCHERREJECT: "/procedure/voucher-reject",
  GETAPPROVALHISTORY: "/procedure/get-approval-history",
  GETPAYMENTDISBURSEMENT: "/procedure/get-payement-disbursement",
  GETVATPERCENT: "/procedure/get-vat-percent",
};

export const PAYMENT_MODE: TPAYMENTMODE[] = [
  { modeCode: "CA", modeName: "Cash" },
  { modeCode: "CQ", modeName: "Cheque" },
  { modeCode: "OT", modeName: "Online Transfer" },
  { modeCode: "VCC", modeName: "Virtual Credit Card" },
];
