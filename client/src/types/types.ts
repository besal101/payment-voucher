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
export type VAT = { Rate: number };
export type Currency = { CurrCode: string; CurrName: string };
export type Employee = { EMP_ID: number; EMP_FULLNAME: string };
export type CostCenterDepartment = { DeptCode: string; DeptName: string };
export type CostCenterDivision = { PrcCode: string; PrcName: string };
export type GLCODE = { ACCODE: string; ACCNAME: string };
export type ProductLine = { ProdLineCode: string; ProdLineName: string };

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
  REQAPINVNO: number;
  REQPAYTOOTHERS: string;
  REQVATPERC: string;
  REQUSERID: string;
  REQUSERLOG: string;
  REQCANCELED: string;
  REQREMARKS: string;
  REQATTACH: string;
  "REQNO:2": number;
  CC_DEPT: string;
  CC_DIV: string;
  CC_PRODLINE: string;
  GLCODE: string;
  GLNAME: string;
  REQDESC: string;
  REQAMOUNT: number;
  "REQREMARKS:2": string;
  REQACTIVE: string;
  "REQATTACH:2": string;
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
  REQCANCELED: string;
  REQAMOUNT: number;
  REQBPCODE: string;
};
