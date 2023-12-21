import { LayoutDashboard, Sheet, ShieldPlus } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

type Props = {
  active: string;
};

const Sidebar: React.FC<Props> = ({ active }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 shadow-xl">
      <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5">
              <img src={logo} className="w-32" alt="" />
            </div>
            <ul className="mt-6 tracking-wide">
              <li className="min-w-max">
                <Link
                  to="/"
                  aria-label="dashboard?uSrId=Bishal&LoTp=874220"
                  className={`${
                    active === "/"
                      ? "relative flex items-center space-x-4 bg-gradient-to-r from-rose-500 to-orange-600 px-4 py-3 text-white hover:bg-gray-200"
                      : "bg group flex items-center space-x-4 px-4 py-3 text-gray-600 hover:bg-slate-100"
                  }`}
                >
                  <LayoutDashboard className="-ml-1 h-6 w-6" />
                  <span className="-mr-1 font-normal text-sm">
                    Received Request
                  </span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  to="/request-payment"
                  className={`${
                    active === "/request-payment?uSrId=Bishal&LoTp=874220"
                      ? "relative flex items-center space-x-4 bg-gradient-to-r from-rose-500 to-orange-600 px-4 py-3 text-white hover:bg-gray-200"
                      : "bg group flex items-center space-x-4 px-4 py-3 text-gray-600 hover:bg-slate-100"
                  }`}
                >
                  <ShieldPlus className="h-5 w-5 " />
                  <span className="text-sm">Create Request</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  to="/view-requested?uSrId=Bishal&LoTp=874220"
                  className={`${
                    active === "/view-requested"
                      ? "relative flex items-center space-x-4 bg-gradient-to-r from-rose-500 to-orange-600 px-4 py-3 text-white hover:bg-gray-200"
                      : "bg group flex items-center space-x-4 px-4 py-3 text-gray-600 hover:bg-slate-100"
                  }`}
                >
                  <Sheet className="h-5 w-5" />
                  <span className="group-hover:text-gray-700 text-sm">
                    View Requested
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
