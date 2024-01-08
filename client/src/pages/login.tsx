import image from "@/assets/sorry.png";

const InvalidLogin = () => {
  return (
    <div className="flex h-screen items-center justify-center text-center leading-7 font-mono italic">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <img src={image} height={120} width={120} alt="Sorry Image" />
        </div>
        <div>
          You are not logged in.
          <br />
          Please login through BI and come back <br />
          You are always welcome here. <br />
        </div>
      </div>
    </div>
  );
};

export default InvalidLogin;
