import { PageLoader } from "@/components/Shared";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SetupNotFound from "@/pages/SetupNotFound";
import SemiRoute from "./SemiRoute";
import Layout from "../Layout";
import ViewApprovalRequests from "@/pages/ViewApprovalRequests";
import FinancePosting from "@/pages/FinancePosting";
const CreateVoucher = lazy(() => import("@/pages/create-payment-request"));
const PaymentRequest = lazy(() => import("@/pages/payment-request"));
const InvalidLogin = lazy(() => import("@/pages/login-page"));
const Error = lazy(() => import("@/pages/error-page"));
const ViewSingleVoucher = lazy(() => import("@/pages/ViewSingleVoucher"));
const ViewReceivedRequest = lazy(() => import("@/pages/ViewReceivedRequest"));
const PaymentDisbursement = lazy(() => import("@/pages/PaymentDisbursement"));
const CashierVoucher = lazy(() => import("@/pages/ViewCashierVoucher"));
const ApprovedPage = lazy(() => import("@/pages/approved-page"));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="login" element={<InvalidLogin />} />
        <Route path="error" element={<Error />} />
        <Route path="no-setup" element={<SetupNotFound />} />
        <Route path="approval" element={<ApprovedPage />} />
        <Route element={<SemiRoute />}>
          <Route
            path="view-received-request"
            element={<ViewReceivedRequest />}
          />
        </Route>
        <Route element={<SemiRoute />}>
          <Route
            path="view-approval-requests"
            element={
              <Layout>
                <ViewApprovalRequests />
              </Layout>
            }
          />
        </Route>

        <Route element={<SemiRoute />}>
          <Route
            path="finance-posting"
            element={
              <Layout>
                <FinancePosting />
              </Layout>
            }
          />
        </Route>

        <Route
          path="payment-disbursement"
          element={
            <Layout>
              <PaymentDisbursement />
            </Layout>
          }
        />
        <Route
          path="view-cashier-voucher"
          element={
            <Layout>
              <CashierVoucher />
            </Layout>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="payment-request" element={<PaymentRequest />} />
          <Route path="payment-request/create" element={<CreateVoucher />} />
          <Route path="view-voucher" element={<ViewSingleVoucher />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
