import { z } from "zod";

// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";

const fieldValidators = {
  name: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(50, { message: "Must be at most 50 characters" }),
  address: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(70, { message: "Must be between 2 and 70 characters" }),
  email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .min(5, { message: "Must be between 5 and 30 characters" })
    .max(30, { message: "Must be between 5 and 30 characters" }),
  // Dates
  date: z.date({
    required_error: "Date is required.",
  }),

  // Strings
  string: z
    .string({
      required_error: "This is required",
    })
    .min(1, { message: "This is required" }),
  stringMin1: z.string().min(1, { message: "Must be at least 1 character" }),
  stringToNumber: z.coerce.number(),

  // Charges
  stringToNumberWithMax: z.coerce.number().max(1000000),

  stringOptional: z.string().optional(),
  numWithCommas: z.coerce
    .number()
    .nonnegative({
      message: "Must be a positive number",
    })
    .transform((value) => {
      return formatNumberWithCommas(value);
    }),
};

const allowedExtensions = [".jpg", ".png", ".pdf", ".doc", ".jpeg", ".docx"];

const AttachmentSchema = z.array(
  z
    .string()
    .refine(
      (value) =>
        allowedExtensions.includes(value.substring(value.lastIndexOf("."))),
      { message: "Invalid file format" }
    )
);

const ItemSchema = z.object({
  division: fieldValidators.string,
  department: fieldValidators.string,
  product_line: fieldValidators.string,
  gl_code: fieldValidators.string,
  gl_name: fieldValidators.string,
  description: fieldValidators.string,
  total: fieldValidators.stringToNumber,
  attachments: AttachmentSchema,
});

const PaymentFormSchema = z.object({
  date: fieldValidators.string,
  cashier_code: fieldValidators.string,
  cashier_name: fieldValidators.string,
  location_code: fieldValidators.string,
  location_name: fieldValidators.string,
  payment_method_code: fieldValidators.string,
  payment_method_name: fieldValidators.string,
  payment_type_code: fieldValidators.string,
  payment_type_name: fieldValidators.string,
  payment_mode_code: fieldValidators.string,
  payment_mode_name: fieldValidators.string,
  currency: fieldValidators.string,
  vendor_code: fieldValidators.string,
  employee_code: fieldValidators.stringOptional,
  pay_to: fieldValidators.string,
  purchase_order: fieldValidators.stringOptional,
  ap_invoice: fieldValidators.stringOptional,
  pay_to_others: fieldValidators.stringOptional,
  vat_percent: fieldValidators.stringToNumber,
  user_id: fieldValidators.stringOptional,
  items: z.array(ItemSchema),
  status: fieldValidators.stringOptional,
  remarks: fieldValidators.stringOptional,
  attachments: fieldValidators.stringOptional,
});

export { PaymentFormSchema, ItemSchema };
