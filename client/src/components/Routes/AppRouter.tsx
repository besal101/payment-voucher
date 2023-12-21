import { lazy, Suspense } from "react";

import Layout from "../Layout";
import Login from "@/pages/login";
import { PageLoader } from "@/components/Shared";

const PageRouter = lazy(() => import("./PageRouter"));

export default function AppRouter() {
  //   const { isLoggedIn } = useSelector(selectAuth);
  const isLoggedIn = true;

  if (!isLoggedIn)
    return (
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    );
  else {
    return (
      <Suspense fallback={<PageLoader />}>
        <Layout>
          <PageRouter />
        </Layout>
      </Suspense>
    );
  }
}
