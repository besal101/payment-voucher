// import ViewRequested from "@/features/ViewRequested";
import { DataTable } from "@/features/ViewApproval";
import { useGetRequestedApprovalsQuery } from "@/query/procedure/getProcedure";
import BeatLoader from "react-spinners/BeatLoader";
import { columns } from "@/features/ViewApproval/components/columns";
import { useUser } from "@/context/UserContext";

const ViewApprovalRequests = () => {
  const { state } = useUser();
  const { data, isLoading } = useGetRequestedApprovalsQuery(state.USER_ID);

  return (
    <div className="px-4 py-4 mt-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <BeatLoader
            loading={true}
            size={20}
            color="blue"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ViewApprovalRequests;
