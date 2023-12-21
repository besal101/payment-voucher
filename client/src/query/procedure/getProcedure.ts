import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import {
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

const fetchVatPercent = async (): Promise<VATRESPONSE> => {
  const { data } = await http.get(API_ENDPOINTS.VAT);
  return data;
};

const useGetVatPercentQuery = (): UseQueryResult<VATRESPONSE, Error> => {
  return useQuery<VATRESPONSE, Error>({
    queryKey: [QUERYKEYS.GETALLVATPERCENT],
    queryFn: () => fetchVatPercent(),
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

export {
  useGetFetchCashierQuery,
  useGetVendorListQuery,
  useGetLocationQuery,
  useGetPaymentMethodQuery,
  useGetPaymentTypeQuery,
  useGetVatPercentQuery,
  useGetCurrencyQuery,
  useGetFetchEmployeeQuery,
  useGetCostCenterDepartmentQuery,
  useGetCostCenterDivisionQuery,
  useGetGLCodeQuery,
  useGetProductLineQuery,
};
