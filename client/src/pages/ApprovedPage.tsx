import image from "@/assets/thankyou.png";
import { useSearchParams } from "react-router-dom";

const ApprovedPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  return (
    <div className="flex h-screen items-center justify-center text-center leading-7 font-mono italic">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <img src={image} height={150} width={150} alt="Sorry Image" />.
        </div>
        <div>
          You have successfully{" "}
          <span className="italic capitalize text-red-500">{status}</span> the
          payment request <br />
          You can close this window now. <br />
        </div>
      </div>
    </div>
  );
};

export default ApprovedPage;
