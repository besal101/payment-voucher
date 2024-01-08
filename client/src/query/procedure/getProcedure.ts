import { groupArray } from "@/lib/helpers";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import {
  APPROVALHISTORYRESPONSE,
  APPROVERTRESPONSE,
  CashierResponse,
  CostCenterDepartmentResponse,
  CostCenterDivisionResponse,
  CurrencyResponse,
  EmployeeResponse,
  GLCODEResponse,
  LocationResponse,
  PaymentMethodResponse,
  PaymentTypeResponse,
  ProductLineResponse,
  VATRESPONSE,
  VENDORLISTRESPONSE,
  VTDATA,
  ViewRequestedResponse,
} from "@/types/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "../constants";

const fetchCashier = async (): Promise<CashierResponse> => {
  const { data } = await http.get(API_ENDPOINTS.CASHIER);
  return data;
};

const useGetFetchCashierQuery = (): UseQueryResult<CashierResponse, Error> => {
  return useQuery<CashierResponse, Error>({
    queryKey: [QUERYKEYS.GETALLCASHIER],
    queryFn: () => fetchCashier(),
  });
};

const fetchVendorList = async (): Promise<VENDORLISTRESPONSE> => {
  const { data } = await http.get(API_ENDPOINTS.VENDORLIST);
  return data;
};

const useGetVendorListQuery = (): UseQueryResult<VENDORLISTRESPONSE, Error> => {
  return useQuery<VENDORLISTRESPONSE, Error>({
    queryKey: [QUERYKEYS.GETALLVENDORLIST],
    queryFn: () => fetchVendorList(),
  });
};

const fetchAllLocation = async (): Promise<LocationResponse> => {
  const { data } = await http.get(API_ENDPOINTS.LOCATION);
  return data;
};

const useGetLocationQuery = (): UseQueryResult<LocationResponse, Error> => {
  return useQuery<LocationResponse, Error>({
    queryKey: [QUERYKEYS.GETALLLOCATION],
    queryFn: () => fetchAllLocation(),
  });
};

const fetchAllPaymentMethod = async (): Promise<PaymentMethodResponse> => {
  const { data } = await http.get(API_ENDPOINTS.PAYMENTMETHOD);
  return data;
};

const useGetPaymentMethodQuery = (): UseQueryResult<
  PaymentMethodResponse,
  Error
> => {
  return useQuery<PaymentMethodResponse, Error>({
    queryKey: [QUERYKEYS.GETALLLPAYMENTMETHOD],
    queryFn: () => fetchAllPaymentMethod(),
  });
};

const fetchAllPaymentType = async (): Promise<PaymentTypeResponse> => {
  const { data } = await http.get(API_ENDPOINTS.PAYMENTYPE);
  return data;
};

const useGetPaymentTypeQuery = (): UseQueryResult<
  PaymentTypeResponse,
  Error
> => {
  return useQuery<PaymentTypeResponse, Error>({
    queryKey: [QUERYKEYS.GETALLPAYMENTYPE],
    queryFn: () => fetchAllPaymentType(),
  });
};

const fetchVatCode = async (): Promise<VATRESPONSE> => {
  const { data } = await http.get(API_ENDPOINTS.VATCODE);
  return data;
};

const useGetVatCodeQuery = (): UseQueryResult<VATRESPONSE, Error> => {
  return useQuery<VATRESPONSE, Error>({
    queryKey: [QUERYKEYS.GETALLVATPERCENT],
    queryFn: () => fetchVatCode(),
  });
};

const fetchAllCurrency = async (): Promise<CurrencyResponse> => {
  const { data } = await http.get(API_ENDPOINTS.CURRENCY);
  return data;
};

const useGetCurrencyQuery = (): UseQueryResult<CurrencyResponse, Error> => {
  return useQuery<CurrencyResponse, Error>({
    queryKey: [QUERYKEYS.GETALLCURRENCY],
    queryFn: () => fetchAllCurrency(),
  });
};

const fetchEmployee = async (): Promise<EmployeeResponse> => {
  const { data } = await http.get(API_ENDPOINTS.EMPLOYEE);
  return data;
};

const useGetFetchEmployeeQuery = (): UseQueryResult<
  EmployeeResponse,
  Error
> => {
  return useQuery<EmployeeResponse, Error>({
    queryKey: [QUERYKEYS.GETALLEMPLOYEE],
    queryFn: () => fetchEmployee(),
  });
};

const fetchAllCostCenterDepartment =
  async (): Promise<CostCenterDepartmentResponse> => {
    const { data } = await http.get(API_ENDPOINTS.COSTCENTERDEPARTMENT);
    return data;
  };

const useGetCostCenterDepartmentQuery = (): UseQueryResult<
  CostCenterDepartmentResponse,
  Error
> => {
  return useQuery<CostCenterDepartmentResponse, Error>({
    queryKey: [QUERYKEYS.GETALLCOSTCENTERDEPARTMENT],
    queryFn: () => fetchAllCostCenterDepartment(),
  });
};

const fetchAllCostCenterDivision =
  async (): Promise<CostCenterDivisionResponse> => {
    const { data } = await http.get(API_ENDPOINTS.COSTCENTERDIVISON);
    return data;
  };

const useGetCostCenterDivisionQuery = (): UseQueryResult<
  CostCenterDivisionResponse,
  Error
> => {
  return useQuery<CostCenterDivisionResponse, Error>({
    queryKey: [QUERYKEYS.GETALLCOSTCENTERDIVISON],
    queryFn: () => fetchAllCostCenterDivision(),
  });
};

const fetchAllGLCode = async (): Promise<GLCODEResponse> => {
  const { data } = await http.get(API_ENDPOINTS.GLCODE);
  return data;
};

const useGetGLCodeQuery = (): UseQueryResult<GLCODEResponse, Error> => {
  return useQuery<GLCODEResponse, Error>({
    queryKey: [QUERYKEYS.GETALLGLCODE],
    queryFn: () => fetchAllGLCode(),
  });
};

const fetchAllProductLine = async (): Promise<ProductLineResponse> => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTLINE);
  return data;
};

const useGetProductLineQuery = (): UseQueryResult<
  ProductLineResponse,
  Error
> => {
  return useQuery<ProductLineResponse, Error>({
    queryKey: [QUERYKEYS.GETALLPRODUCTLINE],
    queryFn: () => fetchAllProductLine(),
  });
};

const fetchAllRequestedVoucher = async (userId: string): Promise<VTDATA[]> => {
  const { data } = await http.get(
    `${API_ENDPOINTS.GETREQUESTEDVOUCHERS}?userId=${userId}`
  );
  const response = groupArray(data.result);
  return response;
};

const useGetRequestedVoucherQuery = (
  userId: string
): UseQueryResult<VTDATA[], Error> => {
  return useQuery<VTDATA[], Error>({
    queryKey: [QUERYKEYS.GETREQUESTEDVOUCHERS, userId],
    queryFn: () => fetchAllRequestedVoucher(userId),
  });
};

const fetchSingleVoucher = async (
  userId: string,
  reqno: string
): Promise<ViewRequestedResponse> => {
  const body = {
    userId,
    reqno,
  };
  const { data } = await http.post(`${API_ENDPOINTS.GETSINGLEVOUCHERS}`, body);
  return data;
};

const useGetSingleVoucherQuery = (
  userId: string,
  reqno: string
): UseQueryResult<ViewRequestedResponse, Error> => {
  return useQuery<ViewRequestedResponse, Error>({
    queryKey: [QUERYKEYS.GETSINGLEVOUCHERS, userId, reqno],
    queryFn: () => fetchSingleVoucher(userId, reqno),
  });
};

const fetchApprover = async (
  userId: string,
  doctype: string,
  requester: string
): Promise<APPROVERTRESPONSE> => {
  const body = {
    userId,
    doctype,
    requserid: requester,
  };
  const { data } = await http.post(`${API_ENDPOINTS.GETAPPROVER}`, body);
  return data;
};

const useGetApproverQuery = (
  userId: string,
  doctype: string,
  requester: string
): UseQueryResult<APPROVERTRESPONSE, Error> => {
  return useQuery<APPROVERTRESPONSE, Error>({
    queryKey: [QUERYKEYS.GETAPPROVER, userId, doctype, requester],
    queryFn: () => fetchApprover(userId, doctype, requester),
  });
};

const fetchNextApprover = async (
  userId: string,
  doctype: string,
  approverstage: number
): Promise<APPROVERTRESPONSE> => {
  const body = {
    userId,
    doctype,
    approverstage,
  };
  const { data } = await http.post(`${API_ENDPOINTS.GETNEXTAPPROVER}`, body);
  return data;
};

const useNextApproverQuery = (
  userId: string,
  doctype: string,
  approverstage: number
): UseQueryResult<APPROVERTRESPONSE, Error> => {
  return useQuery<APPROVERTRESPONSE, Error>({
    queryKey: [QUERYKEYS.GETNEXTAPPROVER, userId, doctype, approverstage],
    queryFn: () => fetchNextApprover(userId, doctype, approverstage),
  });
};

const fetchApprovalHistory = async (
  reqno: string
): Promise<APPROVALHISTORYRESPONSE> => {
  const body = {
    reqno,
  };
  const { data } = await http.post(`${API_ENDPOINTS.GETAPPROVALHISTORY}`, body);
  return data;
};

const useGetApprovalHistory = (
  cashierId: string
): UseQueryResult<APPROVALHISTORYRESPONSE, Error> => {
  return useQuery<APPROVALHISTORYRESPONSE, Error>({
    queryKey: [QUERYKEYS.GETAPPROVALHISTORY, cashierId],
    queryFn: () => fetchApprovalHistory(cashierId),
  });
};

const fetchPaymentDisbursement = async (
  cashierId: string
): Promise<VTDATA[]> => {
  const body = {
    cashierId,
  };
  const { data } = await http.post(
    `${API_ENDPOINTS.GETPAYMENTDISBURSEMENT}`,
    body
  );
  const response = groupArray(data.result);
  return response;
};

const useGetPaymentDisbursement = (
  cashierId: string
): UseQueryResult<VTDATA[], Error> => {
  return useQuery<VTDATA[], Error>({
    queryKey: [QUERYKEYS.GETAPPROVALHISTORY, cashierId],
    queryFn: () => fetchPaymentDisbursement(cashierId),
  });
};

export {
  useGetCostCenterDepartmentQuery,
  useGetCostCenterDivisionQuery,
  useGetCurrencyQuery,
  useGetFetchCashierQuery,
  useGetFetchEmployeeQuery,
  useGetGLCodeQuery,
  useGetLocationQuery,
  useGetPaymentMethodQuery,
  useGetPaymentTypeQuery,
  useGetProductLineQuery,
  useGetRequestedVoucherQuery,
  useGetSingleVoucherQuery,
  useGetVatCodeQuery,
  useGetVendorListQuery,
  useGetApproverQuery,
  useNextApproverQuery,
  useGetApprovalHistory,
  useGetPaymentDisbursement,
};
