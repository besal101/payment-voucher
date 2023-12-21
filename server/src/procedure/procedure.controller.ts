import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { CreatePaymentVoucherDto } from './dto/paymentVoucher.dto';

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
  getPurchaseOrder(@Body() data: { vendorCode: string }) {
    return this.procedure.getPurchaseOrder(data);
  }

  @Post('ap-invoice')
  @HttpCode(HttpStatus.OK)
  getApInvoice(@Body() data: { vendorCode: string }) {
    return this.procedure.getApInvoice(data);
  }

  @Get('vat')
  @HttpCode(HttpStatus.OK)
  getVAT() {
    return this.procedure.getVAT();
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

  @Post('get-voucher')
  @HttpCode(HttpStatus.OK)
  getPaymentVoucher(@Body() data: { userID: string }) {
    return this.procedure.getPaymentVoucher(data);
  }
}
