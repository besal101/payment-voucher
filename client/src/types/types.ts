// Zod
import { ItemSchema, PaymentFormSchema } from "@/lib/schemas";
import { FieldPath } from "react-hook-form";
import z from "zod";

export type PaymentFormType = z.infer<typeof PaymentFormSchema>;

export type ItemType = z.infer<typeof ItemSchema>;

export type NameType = FieldPath<PaymentFormType>;

export type PaginationOption = {
  limit: number;
  page: number;
};

export type Payload = {
  [key: string]: string[];
};

export type TPAYMENTMODE = { modeCode: string; modeName: string };
export type Cashier = { EMP_ID: number; EMP_FULLNAME: string };
export type VENDORLIST = { VENDOR: string; CardCode: string };
export type Location = { PrcCode: string; PrcName: string };
export type PurchaseOrderT = { DocCur: string; DocDate: string; PONO: string };
export type PaymentMethod = { PayMethodCode: string; PayMethodName: string };
export type ApInvoiceT = { INVNO: string; DocDate: string; DocCur: string };
export type PaymentType = { PayTypeCode: string; PayTypeName: string };
export type VAT = { Code: string; Name: string };
export type Currency = { CurrCode: string; CurrName: string };
export type Employee = { EMP_ID: number; EMP_FULLNAME: string };
export type CostCenterDepartment = { DeptCode: string; DeptName: string };
export type CostCenterDivision = { PrcCode: string; PrcName: string };
export type GLCODE = { ACCODE: string; ACCNAME: string };
export type ProductLine = { ProdLineCode: string; ProdLineName: string };
export type VATRATET = { Rate: string };

export type CashierResponse = {
  result: Cashier[];
};

export type VENDORLISTRESPONSE = {
  result: VENDORLIST[];
};

export type LocationResponse = {
  result: Location[];
};

export type PurchaseOrderResponse = {
  result: PurchaseOrderT[];
};

export type PaymentMethodResponse = {
  result: PaymentMethod[];
};

export type ApInvoiceResponse = {
  result: ApInvoiceT[];
};

export type PaymentTypeResponse = {
  result: PaymentType[];
};

export type VATRESPONSE = {
  result: VAT[];
};

export type VATRATERESPONSE = {
  result: VATRATET[];
};

export type CurrencyResponse = {
  result: Currency[];
};

export type EmployeeResponse = {
  result: Employee[];
};

export type CostCenterDepartmentResponse = {
  result: CostCenterDepartment[];
};

export type CostCenterDivisionResponse = {
  result: CostCenterDivision[];
};

export type GLCODEResponse = {
  result: GLCODE[];
};

export type ProductLineResponse = {
  result: ProductLine[];
};

export type ViewRequestedT = {
  REQNO: number;
  REQDATE: string;
  REQCASHIERCODE: string;
  REQCASHIERNAME: string;
  REQLOCCODE: string;
  REQLOCNAME: string;
  REQMETHODCODE: string;
  REQMETHODNAME: string;
  REQTYPECODE: string;
  REQTYPENAME: string;
  REQMODECODE: string;
  REQMODENAME: string;
  REQCURRCODE: string;
  REQBPCODE: string;
  REQEMPCODE: number;
  REQPONO: number;
  REQEMPNAME: string;
  REQAPINVNO: number;
  REQPAYTOOTHERS: string;
  REQVATPERC: string;
  REQUSERID: string;
  REQUSERNAME: string;
  REQUSERLOG: string;
  RESTATUS: string;
  REQREMARKS: string;
  TOTALAMT: number;
  REQATTACH: string;
  "REQNO:2": number;
  CC_DEPT: string;
  CC_DEPTNAM: string;
  CC_DIV: string;
  CC_DIVNAM: string;
  CC_PRODLINE: string;
  CC_PRODLINENAM: string;
  GLCODE: string;
  GLNAME: string;
  REQDESC: string;
  REQAMOUNT: number;
  APPROVEDUSERNAME: string;
  PAIDSIGNDOC: string;
  "REQREMARKS:2": string;
  REQACTIVE: string;
  "REQATTACH:2": string;
  RECEIVEDBY: string;
  REQCANCELED: string;
  PAIDEMPNAME: string;
};

export type ViewRequestedResponse = {
  result: ViewRequestedT[];
};

export type VTDATA = {
  REQNO: number;
  REQDATE: string;
  REQLOCNAME: string;
  REQTYPENAME: string;
  REQCURRCODE: string;
  REQVATPERC: string;
  RESTATUS: string;
  REQAMOUNT: number;
  REQBPCODE: string;
  REQUSERID: string;
  REQUSERNAME: string;
  TOTALAMT?: number;
  REQMODENAME: string;
};

export type APPROVERT = {
  USERID: string;
  USERNAME: string;
  APPROVALSTAGE: number;
  USEREMAIL: string;
  USERMOBILE: string;
};

export type APPROVERTRESPONSE = {
  result: APPROVERT[];
};

export type APPROVALHISTORY = {
  REQNO: string;
  APPROVERUSERID: string;
  APPROVELUSERNAME: string;
  APPROVERSTAGE: string;
  APPROVERSTATUS: string;
  APPROVERLOG: string;
  APPROVEREMARKS: string;
};

export type APPROVALHISTORYRESPONSE = {
  result: APPROVALHISTORY[];
};

export type CASHIER = {
  USER_ID: string;
  USER_NAME: string;
  USER_EMAIL: string;
};

export type CASHIERRESPONSE = {
  result: CASHIER[];
};
