import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
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
  department: string;

  @IsNotEmpty()
  @IsString()
  division: string;

  @IsNotEmpty()
  @IsString()
  product_line: string;

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

  remark: string;

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

  @IsString()
  employee_code: string;

  @IsNotEmpty()
  @IsString()
  purchase_order: string;

  @IsNotEmpty()
  @IsString()
  ap_invoice: string;

  @IsString()
  pay_to_others: string;

  @IsNotEmpty()
  vat_percent: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  status: boolean;

  @IsString()
  remarks: string;

  @IsOptional()
  @IsString()
  attachments: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
