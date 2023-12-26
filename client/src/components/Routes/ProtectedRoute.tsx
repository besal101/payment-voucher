import { Navigate } from "react-router";
import { Outlet, useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uSrId") || "";
  const { dispatch } = useUser();

  useEffect(() => {
    dispatch({ type: "SET_USER_ID", payload: userId });
  }, [dispatch, userId]);

  if (userId) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
