import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const ReceivedRequest = lazy(() => import("@/pages/ReceivedRequest"));
const Login = lazy(() => import("@/pages/login"));
const CreateVoucher = lazy(() => import("@/pages/createvoucher"));
const ListVoucher = lazy(() => import("@/pages/listvoucher"));

export default function PageRouter() {
  const element = useRoutes([
    {
      path: "/",
      element: <ReceivedRequest />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/request-payment",
      element: <CreateVoucher />,
    },
    {
      path: "/view-requested",
      element: <ListVoucher />,
    },
  ]);

  return element;
}
