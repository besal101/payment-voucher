import { PDDataTable } from "@/features/PaymentDisbursement";
import { columns } from "@/features/PaymentDisbursement/components/columns";
import { useGetPaymentDisbursement } from "@/query/procedure/getProcedure";
import { useSearchParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const PaymentDisbursement = () => {
  const [searchParams] = useSearchParams();
  const uSrId = searchParams.get("uSrId") || "";
  const { data, isLoading } = useGetPaymentDisbursement(uSrId);

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
        <PDDataTable columns={columns} data={data} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PaymentDisbursement;
