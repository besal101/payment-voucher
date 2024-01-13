import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const InvalidLogin = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uSrId") || "";
  const reqno = searchParams.get("reqno") || "";
  const redirectTo = searchParams.get("redirectTo") || "";
  const [userID, setUserID] = useState<string>(userId);
  const [otpInput, setOTPInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [generateOTP, setGenerateOTP] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOTP = async () => {
    setLoading(true);
    await http.post(`${API_ENDPOINTS.GENERATEOTP}`, {
      userId: userID,
    });
    toast({
      title: "OTP sent successfully",
      description: "Kindly check your email or messages.",
    });
    setOTPInput(true);
    setLoading(false);
  };

  const validateOTP = async () => {
    setLoading(true);
    const { data } = await http.post(`${API_ENDPOINTS.VERIFYOTP}`, {
      userId: userID,
      OTP: generateOTP,
    });
    if (data.ValidateOTPResult.Output === "Failed") {
      toast({
        variant: "destructive",
        title: "Uh oh! OTP Validation Failed",
        description: "Please try again",
      });
      setLoading(false);
      return;
    }
    const navroute = redirectTo === "" ? "/payment-request" : `${redirectTo}`;
    navigate(`${navroute}?uSrId=${userId}&LoTp=${generateOTP}&reqno=${reqno}`);
  };

  return (
    <div className="flex h-screen flex-col after:px-6 py-12  bg-white md:bg-gray-300 lg:px-8">
      <div className="hidden md:block sm:mx-auto sm:w-full sm:max-w-sm mt-4">
        <img className="mx-auto h-12 w-auto" src={logo} alt="Your Company" />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg shadow-xl">
        <div className="px-6 py-5 flex flex-col gap-2">
          <div>
            <Label>UserID</Label>
            <Input
              type="text"
              placeholder="UserId"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>
          {otpInput && (
            <div>
              <Label>OTP</Label>
              <Input
                type="text"
                placeholder="OTP"
                value={generateOTP}
                onChange={(e) => setGenerateOTP(e.target.value)}
              />
            </div>
          )}

          <Button
            className="mt-4 font-sourcesans font-normal h-8 shadow-md transition-all delay-300 duration-300 ease-in-out"
            size={"xs"}
            variant={"secondary"}
            onClick={otpInput ? validateOTP : handleOTP}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Generate OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvalidLogin;
