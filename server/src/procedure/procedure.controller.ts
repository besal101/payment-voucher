import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePaymentVoucherDto } from './dto/paymentVoucher.dto';
import {
  GetApInvoice,
  GetApprovalHistory,
  GetApproverDto,
  GetNextLevelApproverDto,
  GetPaymentDisbursement,
  GetPurchaseOrder,
  GetSingleVoucher,
  GetVatPercent,
  HandleVoucherApprove,
  HandleVoucherReject,
  RequesterInfoDto,
  VerifyApproverExists,
} from './dto/requesterInfo.dto';
import { ProcedureService } from './procedure.service';

@Controller('procedure')
export class ProcedureController {
  constructor(private procedure: ProcedureService) {}

  /**
   * Http method get
   * @returns currency array from hana database
   */
  @Get('currency')
  @HttpCode(HttpStatus.OK)
  getCurrency() {
    return this.procedure.getCurrency();
  }

  @Get('location')
  @HttpCode(HttpStatus.OK)
  getLocation() {
    return this.procedure.getLocation();
  }

  @Get('cost-center-division')
  @HttpCode(HttpStatus.OK)
  getCCD() {
    return this.procedure.getCCD();
  }

  @Get('cost-center-department')
  @HttpCode(HttpStatus.OK)
  getccdep() {
    return this.procedure.getccdep();
  }

  @Get('glcode')
  @HttpCode(HttpStatus.OK)
  getglCode() {
    return this.procedure.getglCode();
  }

  @Get('product-line')
  @HttpCode(HttpStatus.OK)
  getproductLine() {
    return this.procedure.getproductLine();
  }

  @Get('payment-type')
  @HttpCode(HttpStatus.OK)
  getPaymentType() {
    return this.procedure.getPaymentType();
  }

  @Get('payment-method')
  @HttpCode(HttpStatus.OK)
  getPaymentMethod() {
    return this.procedure.getPaymentMethod();
  }

  @Get('vendor-list')
  @HttpCode(HttpStatus.OK)
  getVendorList() {
    return this.procedure.getVendorList();
  }

  @Post('purchase-order')
  @HttpCode(HttpStatus.OK)
  getPurchaseOrder(@Body() data: GetPurchaseOrder) {
    return this.procedure.getPurchaseOrder(data);
  }

  @Post('ap-invoice')
  @HttpCode(HttpStatus.OK)
  getApInvoice(@Body() data: GetApInvoice) {
    return this.procedure.getApInvoice(data);
  }

  @Get('vat')
  @HttpCode(HttpStatus.OK)
  getVAT() {
    return this.procedure.getVAT();
  }

  @Post('get-vat-percent')
  @HttpCode(HttpStatus.OK)
  getVatPercentage(@Body() data: GetVatPercent) {
    return this.procedure.getVatPercentage(data);
  }

  @Get('employee')
  @HttpCode(HttpStatus.OK)
  getEmployee() {
    return this.procedure.getEmployee();
  }

  @Get('cashier')
  @HttpCode(HttpStatus.OK)
  getCashier() {
    return this.procedure.getCashier();
  }

  @Post('create-voucher')
  @HttpCode(HttpStatus.OK)
  createPaymentVoucher(@Body() data: CreatePaymentVoucherDto) {
    return this.procedure.createPaymentVoucher(data);
  }

  @Get('get-voucher')
  @HttpCode(HttpStatus.OK)
  getPaymentVoucher(@Query('userId') userId: string) {
    return this.procedure.getPaymentVoucher(userId);
  }

  /**
   *  Verify if the user have approver
   * if not then redirect from the front end
   */
  @Post('check-approver')
  @HttpCode(HttpStatus.OK)
  verifyApproverExist(@Body() data: VerifyApproverExists) {
    return this.procedure.verifyApproverExist(data);
  }

  /**
   *
   * Get the current approval stage of the userInfo.
   * If not approval is found than Redirect.
   *
   */

  @Post('requester-info')
  @HttpCode(HttpStatus.OK)
  getRequesterInfo(@Body() data: RequesterInfoDto) {
    return this.procedure.getRequesterInfo(data);
  }

  /**
   *
   * Get the current approval stage of the userInfo.
   * If not approval is found than Redirect.
   *
   */

  @Post('get-approver')
  @HttpCode(HttpStatus.OK)
  getApprovers(@Body() data: GetApproverDto) {
    return this.procedure.getApprovers(data);
  }

  /**
   * Get single Transaction using REQNO and UserID as Parameter
   *
   */
  @Post('get-single-voucher')
  @HttpCode(HttpStatus.OK)
  getSingleVoucher(@Body() data: GetSingleVoucher) {
    return this.procedure.getSingleVoucher(data);
  }

  @Post('get-next-level-approver')
  @HttpCode(HttpStatus.OK)
  getNextApprovers(@Body() data: GetNextLevelApproverDto) {
    return this.procedure.getNextApprovers(data);
  }

  @Post('voucher-approve')
  @HttpCode(HttpStatus.OK)
  handleVoucherApprove(@Body() data: HandleVoucherApprove) {
    return this.procedure.handleVoucherApprove(data);
  }

  @Post('voucher-reject')
  @HttpCode(HttpStatus.OK)
  handleVoucherReject(@Body() data: HandleVoucherReject) {
    return this.procedure.handleVoucherReject(data);
  }

  @Post('get-approval-history')
  @HttpCode(HttpStatus.OK)
  getApprovalHistory(@Body() data: GetApprovalHistory) {
    return this.procedure.getApprovalHistory(data);
  }

  @Post('get-payement-disbursement')
  @HttpCode(HttpStatus.OK)
  getPaymentDisbursement(@Body() data: GetPaymentDisbursement) {
    return this.procedure.getPaymentDisbursement(data);
  }
}
