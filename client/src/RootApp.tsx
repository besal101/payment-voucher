import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { PageLoader } from "@/components/Shared";

const Routes = lazy(() => import("@/components/Routes/AppRouter"));

export default function RoutApp() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}
