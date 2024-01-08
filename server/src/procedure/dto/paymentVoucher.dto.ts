import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// Ensure that this enum matches the one defined in Prisma
export enum Status {
  active = 1,
  inactive = 0,
}

class ItemDto {
  @IsNotEmpty()
  @IsString()
  division_code: string;

  @IsNotEmpty()
  @IsString()
  division_name: string;

  @IsNotEmpty()
  @IsString()
  department_code: string;

  @IsNotEmpty()
  @IsString()
  department_name: string;

  @IsNotEmpty()
  @IsString()
  product_line_code: string;

  @IsNotEmpty()
  @IsString()
  product_line_name: string;

  @IsNotEmpty()
  @IsString()
  gl_code: string;

  @IsNotEmpty()
  @IsString()
  gl_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsOptional()
  remark: string;

  @IsOptional()
  active: string;

  @IsArray()
  @IsOptional()
  attachments: string[];
}

export class CreatePaymentVoucherDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  cashier_code: string;

  @IsNotEmpty()
  @IsString()
  cashier_name: string;

  @IsNotEmpty()
  @IsString()
  location_code: string;

  @IsNotEmpty()
  @IsString()
  location_name: string;

  @IsNotEmpty()
  @IsString()
  payment_method_code: string;

  @IsNotEmpty()
  @IsString()
  payment_method_name: string;

  @IsNotEmpty()
  @IsString()
  payment_type_code: string;

  @IsNotEmpty()
  @IsString()
  payment_type_name: string;

  @IsNotEmpty()
  @IsString()
  payment_mode_code: string;

  @IsNotEmpty()
  @IsString()
  payment_mode_name: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  vendor_code: number;

  @IsOptional()
  @IsString()
  vendor_name: string;

  @IsNumber()
  @IsOptional()
  employee_code: number;

  @IsString()
  @IsOptional()
  employee_name: string;

  @IsNumber()
  purchase_order: number;

  @IsNumber()
  ap_invoice: number;

  @IsString()
  pay_to_others: string;

  @IsNotEmpty()
  vat_percent: string;

  @IsNotEmpty()
  vat_code: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  remarks: string;

  @IsOptional()
  @IsString()
  attachments: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsInt()
  total_amount: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
