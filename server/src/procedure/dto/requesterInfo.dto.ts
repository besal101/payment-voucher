import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequesterInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  doctype: string;
}

export class VerifyApproverExists {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  doctype: string;
}

export class GetNextLevelApproverDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  doctype: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  approverstage: number;
}

export class GetApproverDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  doctype: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requserid: string;
}

export class GetSingleVoucher {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reqno: string;
}

export class HandleVoucherApprove {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reqno: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  approverstage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  approver_userid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  approver_username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  app_status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  next_approver: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  app_level: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requester: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalAmount: string;
}

export class HandleVoucherReject {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reqno: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  approverstage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  approver_userid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  approver_username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  app_status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  next_approver: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  app_level: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requester: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalAmount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rejectRemark: string;
}

export class GetApprovalHistory {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reqno: string;
}

export class GetPaymentDisbursement {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cashierId: string;
}

export class GetPurchaseOrder {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vendorCode: string;
}

export class GetApInvoice {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vendorCode: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  purchaseOrder: number;
}

export class GetVatPercent {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vatCode: string;
}

export class VerifyOTP {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  OTP: string;
}

export class GenerateOTP {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class CashierVoucherPaidDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  REQNUM: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  PAIDSTATUS: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  PAIDUSERID: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  PAIDUSERNAME: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  REQSTATUS: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  PAIDREMARKS: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  PAIDSIGNDOC: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  RECEIVEDBY: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  RECEIVERPHONE: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  RECEIVERDESIG: string;
}
