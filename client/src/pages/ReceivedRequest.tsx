import ViewRequested from "@/features/ViewRequested";
import { useGetRequestedVoucherQuery } from "@/query/procedure/getProcedure";
import { useSearchParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const ReceivedRequest = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uSrId") as string;
  const { data, isLoading } = useGetRequestedVoucherQuery(userId);

  return (
    <div className="px-4 py-4 mt-6">
      {isLoading && data === undefined ? (
        <div className="flex justify-center items-center h-40">
          <BeatLoader
            loading={true}
            size={20}
            color="blue"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <ViewRequested result={data?.result || []} />
      )}
    </div>
  );
};

export default ReceivedRequest;
