import { PageLoader } from "@/components/Shared";
import Homepage from "@/pages/Homepage";
import ReceivedRequest from "@/pages/ReceivedRequest";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const CreateVoucher = lazy(() => import("@/pages/CreateVoucher"));
const ListVoucher = lazy(() => import("@/pages/ListVoucher"));
const Login = lazy(() => import("@/pages/login"));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="received-request" element={<ReceivedRequest />} />
          <Route path="create-payment" element={<CreateVoucher />} />
          <Route path="view-requested" element={<ListVoucher />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}
