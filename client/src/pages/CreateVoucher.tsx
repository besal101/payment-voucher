import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormType } from "@/types/types";
import { PaymentFormSchema } from "@/lib/schemas";
import { FORM_DEFAULT_VALUES } from "@/lib/variables";
import CreateVC from "@/features/Create";

const Createvoucher = () => {
  const form = useForm<PaymentFormType>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  return (
    <div className="pb-8">
      <div className="border bg-slate-50 border-gray-300/40 rounded-md mt-6">
        <div className="flex flex-col mb-6 relative mt-1">
          <FormProvider {...form}>
            <CreateVC />
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Createvoucher;