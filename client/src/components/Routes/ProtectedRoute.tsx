import { Navigate } from "react-router";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uSrId") || "";
  const LoTp = searchParams.get("LoTp") || "";

  const path = useLocation();
  const { dispatch } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!LoTp || isNaN(Number(LoTp))) {
      navigate(`/login${path.search}&redirectTo=${path.pathname}`);
      return;
    }

    const verifyOTP = async () => {
      try {
        const { data } = await http.post(`${API_ENDPOINTS.VERIFYOTP}`, {
          userId: userId,
          OTP: LoTp,
        });
        if (data.ValidateOTPResult.Output === "Failed") {
          navigate(`/login${path.search}&redirectTo=${path.pathname}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    verifyOTP();

    const fetchData = async () => {
      try {
        const { data } = await http.post(
          `${API_ENDPOINTS.VALIDATECHECKAPPROVER}`,
          {
            userId: userId,
            doctype: "PAYREQ",
          }
        );
        if (data.result[0].APPCOUNT === 0) {
          navigate("no-setup", { replace: true });
        } else {
          const response = await http.post(
            `${API_ENDPOINTS.GETREQUESTERINFO}`,
            {
              userId: userId,
            }
          );
          dispatch({
            type: "SET_USER",
            payload: {
              ...response.data.result[0],
              OTP: LoTp,
              APPROVALS: data.result[0].APPCOUNT,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [LoTp, dispatch, navigate, path, userId]);

  if (userId && LoTp) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
