import image from "@/assets/sorry.png";

const SetupNotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center text-center leading-7 font-mono italic">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <img src={image} height={120} width={120} alt="Sorry Image" />
        </div>
        <div>
          Ooops !!! Something went wrong.
          <br />
          Please contact IT administration. <br />
        </div>
      </div>
    </div>
  );
};

export default SetupNotFound;
