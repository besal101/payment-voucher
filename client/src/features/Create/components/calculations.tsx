import { Separator } from "@/components/ui/separator";
import { PaymentFormType } from "@/types/types";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const Calculations = () => {
  const { control, setValue } = useFormContext<PaymentFormType>();
  const [totalNet, setTotalNet] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const totals = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const currency = useWatch({
    control,
    name: "currency",
    defaultValue: "AED",
  });

  const vatPercent = useWatch({
    control,
    name: "vat_percent",
    defaultValue: 0,
  });

  useEffect(() => {
    const totalnet = totals.reduce((sum, item) => sum + item.total, 0);
    setTotalNet(totalnet);
    const total = totalnet + (totalnet * vatPercent) / 100;
    setTotalAmount(total);

    setValue("total_amount", total);
  }, [setValue, totals, vatPercent]);

  return (
    <div className="flex flex-col ml-5 font-poppins">
      <div className="flex flex-row justify-between text-[9.54px] font-semibold">
        <span>Amount before VAT</span>
        <span>:</span>
        <span>
          {currency} {totalNet !== 0 && currency} {totalNet}
        </span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
      <div className="flex flex-row justify-between text-[9.54px] font-semibold mt-2">
        <span>VAT %</span>
        <span>:</span>
        <span>{vatPercent}%</span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
      <div className="flex flex-row justify-between text-[9.54px] font-semibold mt-2">
        <span>VAT Amount</span>
        <span>:</span>
        <span>
          {" "}
          {currency} {(totalNet * vatPercent) / 100}
        </span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
      <div className="flex flex-row justify-between text-[9.54px] font-semibold mt-2">
        <span>Total</span>
        <span>:</span>
        <span>
          {currency} {totalAmount}
        </span>
      </div>
      <Separator className="my-0.5 bg-gray-900 h-[1px]" />
    </div>
  );
};

export default Calculations;
