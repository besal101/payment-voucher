import { Separator } from "@/components/ui/separator";
import { PaymentFormType } from "@/types/types";
import { useFormContext, useWatch } from "react-hook-form";

const Calculations = () => {
  const { control } = useFormContext<PaymentFormType>();

  const totals = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const currency = useWatch({
    control,
    name: "currency",
    defaultValue: "",
  });

  const vatPercent = useWatch({
    control,
    name: "vat_percent",
    defaultValue: 0,
  });

  // Calculate the sum of the "total" values
  const totalnet = totals.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col ml-5 font-poppins">
      <div className="flex flex-row justify-between text-[9.54px] font-semibold">
        <span>Amount before VAT</span>
        <span>:</span>
        <span>
          {totalnet !== 0 && currency} {totalnet}
        </span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
      <div className="flex flex-row justify-between text-[9.54px] font-semibold mt-2">
        <span>VAT</span>
        <span>:</span>
        <span>{vatPercent}%</span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
      <div className="flex flex-row justify-between text-[9.54px] font-semibold mt-2">
        <span>Total</span>
        <span>:</span>
        <span>
          {currency} {totalnet + (totalnet * vatPercent) / 100}
        </span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
    </div>
  );
};

export default Calculations;
