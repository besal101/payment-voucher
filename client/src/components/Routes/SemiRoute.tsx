import { Outlet, useSearchParams } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { PageLoader } from "../Shared";

export default function SemiRoute() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uSrId") || "";

  const { dispatch } = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.post(`${API_ENDPOINTS.GETREQUESTERINFO}`, {
          userId: userId,
        });
        dispatch({
          type: "SET_USER",
          payload: {
            ...response.data.result[0],
            APPROVALS: 0,
          },
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch, userId]);

  return loading ? <PageLoader /> : <Outlet />;
}
