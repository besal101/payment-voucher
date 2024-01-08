const d = new Date();
const options: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const FORM_DEFAULT_VALUES = {
  date: d.toLocaleDateString("en-US", options),
  cashier_code: "",
  cashier_name: "",
  location_code: "",
  location_name: "",
  payment_method_code: "",
  payment_method_name: "",
  payment_type_code: "",
  payment_type_name: "",
  payment_mode_code: "",
  payment_mode_name: "",
  currency: "AED",
  vendor_code: "",
  vendor_name: "",
  user_id: "",
  purchase_order: 0,
  ap_invoice: 0,
  pay_to: "employee",
  pay_to_others: "",
  vat_code: "",
  vat_percent: 0,
  employee_code: 0,
  employee_name: "",
  status: "y",
  remarks: "",
  attachments: "",
  total_amount: 0,
  items: [
    {
      division_code: "",
      division_name: "",
      department_code: "",
      department_name: "",
      product_line_code: "",
      product_line_name: "",
      gl_code: "",
      gl_name: "",
      description: "",
      total: 0,
      attachments: [],
    },
  ],
};

export const statuses = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Approved",
    label: "Approved",
  },
  {
    value: "Rejected",
    label: "Rejected",
  },
];
