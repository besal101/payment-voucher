import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HanaService } from 'src/hana/hana.service';
import { CreateMailerDto, SuccessMailerDto } from 'src/mailer/dto/mailer.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { CreatePaymentVoucherDto } from './dto/paymentVoucher.dto';
import {
  CashierVoucherPaidDTO,
  GenerateOTP,
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
  VerifyOTP,
} from './dto/requesterInfo.dto';
import axios from 'axios';

@Injectable()
export class ProcedureService {
  constructor(
    private db: HanaService,
    private mailer: MailerService,
    private config: ConfigService,
  ) {}

  /**
   * Fetch currency from hana database
   * @returns currency array
   */
  async getCurrency() {
    const sp_proc = `CALL PP_10010()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getLocation() {
    const sp_proc = `CALL PP_10012()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getCCD() {
    const sp_proc = `CALL PP_10011()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getccdep() {
    const sp_proc = `CALL PP_10015()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getglCode() {
    const sp_proc = `CALL PP_10016()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getproductLine() {
    const sp_proc = `CALL PP_10014()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getPaymentType() {
    const sp_proc = `CALL PP_10017()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getPaymentMethod() {
    const sp_proc = `CALL PP_10018()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getVendorList() {
    const sp_proc = `CALL PP_10025()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getPurchaseOrder(data: GetPurchaseOrder) {
    const sp_proc = `CALL PP_10026('${data.vendorCode}')`;

    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getApInvoice(data: GetApInvoice) {
    const sp_proc = `CALL PP_10027('${data.vendorCode}','${data.purchaseOrder}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getVAT() {
    const sp_proc = `CALL PP_10028()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getEmployee() {
    const sp_proc = `CALL PP_10029()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getCashier() {
    const sp_proc = `CALL PP_10030()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async createPaymentVoucher(data: CreatePaymentVoucherDto) {
    const d = new Date();
    const user_log = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const paramHeader = [];

    paramHeader.push("'" + 0 + "'");
    paramHeader.push("'" + user_log + "'");
    paramHeader.push("'" + data.cashier_code + "'");
    paramHeader.push("'" + data.cashier_name + "'");
    paramHeader.push("'" + data.location_code + "'");
    paramHeader.push("'" + data.location_name + "'");
    paramHeader.push("'" + data.payment_method_code + "'");
    paramHeader.push("'" + data.payment_method_name + "'");
    paramHeader.push("'" + data.payment_type_code + "'");
    paramHeader.push("'" + data.payment_type_name + "'");
    paramHeader.push("'" + data.payment_mode_code + "'");
    paramHeader.push("'" + data.payment_mode_name + "'");
    paramHeader.push("'" + data.currency + "'");
    paramHeader.push("'" + data.vendor_code + "'");
    paramHeader.push("'" + data.vendor_name + "'");
    paramHeader.push("'" + data.employee_code + "'");
    paramHeader.push("'" + data.employee_name + "'");
    paramHeader.push("'" + data.purchase_order + "'");
    paramHeader.push("'" + data.ap_invoice + "'");
    paramHeader.push("'" + data.pay_to_others + "'");
    paramHeader.push("'" + data.vat_code + "'");
    paramHeader.push("'" + data.vat_percent + "'");
    paramHeader.push("'" + data.total_amount + "'");
    paramHeader.push("'" + data.user_id + "'");
    paramHeader.push("'" + data.username + "'");
    paramHeader.push("'" + user_log + "'");
    paramHeader.push("'" + data.remarks + "'");
    paramHeader.push("'" + data.attachments + "'");
    paramHeader.push('?');

    const sp_proc = `CALL PP_50001(${paramHeader})`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      const generatedId = result[0].O_REQNO;
      for (const item of data.items) {
        const itemsParams = [];
        itemsParams.push("'" + generatedId + "'");
        itemsParams.push("'" + item.department_code + "'");
        itemsParams.push("'" + item.department_name + "'");
        itemsParams.push("'" + item.division_code + "'");
        itemsParams.push("'" + item.division_name + "'");
        itemsParams.push("'" + item.product_line_code + "'");
        itemsParams.push("'" + item.product_line_name + "'");
        itemsParams.push("'" + item.gl_code + "'");
        itemsParams.push("'" + item.gl_name + "'");
        itemsParams.push("'" + item.description + "'");
        itemsParams.push("'" + item.total + "'");
        itemsParams.push("''");
        itemsParams.push("'n'");
        itemsParams.push("'" + JSON.stringify(item.attachments) + "'");
        const sp_proc_items = `CALL PP_50002(${itemsParams})`;
        await this.db.executeQuery(sp_proc_items);
      }
      const approvalParam = [];
      approvalParam.push("'" + generatedId + "'");
      approvalParam.push("'PAYREQ'");
      approvalParam.push("'" + data.user_id + "'");
      const sp_proc_approval = `CALL PP_50003(${approvalParam})`;
      await this.db.executeQuery(sp_proc_approval);

      const totalnet = data.items.reduce((sum, item) => sum + item.total, 0);
      const totalAmount = totalnet + (totalnet * +data.vat_percent) / 100;

      const arg: GetNextLevelApproverDto = {
        userId: data.user_id,
        doctype: 'PAYREQ',
        approverstage: 0,
      };

      const approvers = await this.getNextApprovers(arg);

      const mailer: CreateMailerDto = {
        createdBy: data.username,
        email: 'Bishal@neweast.co',
        // email: approvers.result[0].USEREMAIL,
        name: approvers.result[0].USERNAME,
        navigateTo: `${this.config.get<string>(
          'FRONT_END',
        )}/view-received-request?uSrId=${
          approvers.result[0].USERID
        }&reqno=${generatedId}&requester=${data.user_id}`,
        totalAmount: `${data.currency} ${totalAmount} `,
      };

      await this.testMail(mailer);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getPaymentVoucher(userId: string) {
    const sp_proc = `CALL PP_10031('${userId}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async verifyApproverExist(data: VerifyApproverExists) {
    const sp_proc = `CALL PP_10032('${data.userId}', '${data.doctype}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getRequesterInfo(data: RequesterInfoDto) {
    const sp_proc = `CALL PP_10035('${data.userId}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getNextApprovers(data: GetNextLevelApproverDto) {
    const sp_proc = `CALL PP_10033('${data.userId}', '${data.doctype}', '${data.approverstage}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getApprovers(data: GetApproverDto) {
    const sp_proc = `CALL PP_10034('${data.userId}', '${data.doctype}', '${data.requserid}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getSingleVoucher(data: GetSingleVoucher) {
    const sp_proc = `CALL PP_10036('${data.userId}', '${data.reqno}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getVatPercentage(data: GetVatPercent) {
    const sp_proc = `CALL PP_10039('${data.vatCode}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async handleVoucherApprove(data: HandleVoucherApprove) {
    const sp_proc = `CALL PP_50004('${data.reqno}', '${data.approverstage}', '${data.approver_userid}', '${data.approver_username}', '${data.app_status}', '${data.next_approver}','', '${data.app_level}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      const arg: GetNextLevelApproverDto = {
        userId: data.requester,
        doctype: 'PAYREQ',
        approverstage: data.approverstage,
      };

      const d = {
        userId: data.requester,
        doctype: 'PAYREQ',
      };

      const reqer = await this.getRequesterInfo(d);

      const approvers = await this.getNextApprovers(arg);

      if (approvers?.result.length === 0) {
        const mailer: SuccessMailerDto = {
          email: 'Bishal@neweast.co',
          // email: approvers.result[0].USEREMAIL,
          name: reqer.result[0].EMP_FULLNAME,
          navigateTo: `${this.config.get<string>(
            'FRONT_END',
          )}/view-voucher?uSrId=${reqer.result[0].USER_ID}&reqno=${data.reqno}`,
          totalAmount: `${data.currency} ${data.totalAmount} `,
        };
        await this.sucessMail(mailer);
      } else {
        const mailer: CreateMailerDto = {
          createdBy: reqer.result[0].EMP_FULLNAME,
          email: 'Bishal@neweast.co',
          // email: approvers.result[0].USEREMAIL,
          name: approvers.result[0].USERNAME,
          navigateTo: `${this.config.get<string>(
            'FRONT_END',
          )}/view-voucher?uSrId=${reqer.result[0].USER_ID}&reqno=${data.reqno}`,
          totalAmount: `${data.currency} ${data.totalAmount} `,
        };
        await this.testMail(mailer);
      }
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async handleVoucherReject(data: HandleVoucherReject) {
    const sp_proc = `CALL PP_50004('${data.reqno}', '${data.approverstage}', '${data.approver_userid}', '${data.approver_username}', '${data.app_status}', '${data.next_approver}','${data.rejectRemark}', '${data.app_level}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      const d = {
        userId: data.requester,
        doctype: 'PAYREQ',
      };

      const reqer = await this.getRequesterInfo(d);

      const mailer: SuccessMailerDto = {
        email: 'Bishal@neweast.co',
        // email: approvers.result[0].USEREMAIL,
        name: reqer.result[0].EMP_FULLNAME,
        navigateTo: `${this.config.get<string>(
          'FRONT_END',
        )}/view-voucher?uSrId=${reqer.result[0].USER_ID}&reqno=${data.reqno}`,
        totalAmount: `${data.currency} ${data.totalAmount} `,
      };
      await this.rejectMail(mailer);

      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getApprovalHistory(data: GetApprovalHistory) {
    const sp_proc = `CALL PP_10037('${data.reqno}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getPaymentDisbursement(data: GetPaymentDisbursement) {
    const sp_proc = `CALL PP_10038('${data.cashierId}')`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async verifyOTP(data: VerifyOTP) {
    try {
      const response = await axios.get(
        `http://20.74.247.50:83/SBOS.NEGT.ASKME.WCF.WcfNEGTASKME.svc/ValidateOTP?UserId=${data.userId}&OTP=${data.OTP}`,
      );
      const responseData = response.data;

      return responseData;
    } catch (error) {
      console.error('Error in testotp:', error);
      throw error;
    }
  }

  async generateOTP(data: GenerateOTP) {
    try {
      const response = await axios.get(
        `http://20.74.247.50:83/SBOS.NEGT.ASKME.WCF.WcfNEGTASKME.svc/GenerateOTP?RequestID=1&UserId=${data.userId}`,
      );
      const responseData = response.data;

      return responseData;
    } catch (error) {
      console.error('Error in testotp:', error);
      throw error;
    }
  }

  async getAllApprovalScreen() {
    const sp_proc = `CALL PP_10040()`;
    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async cashierVoucherPaid(data: CashierVoucherPaidDTO) {
    const paramHeader = [
      data.REQNUM,
      data.PAIDSTATUS,
      data.PAIDUSERID,
      data.PAIDUSERNAME,
      data.REQSTATUS,
      data.PAIDREMARKS,
      data.PAIDSIGNDOC,
      data.RECEIVEDBY,
      data.RECEIVERPHONE,
      data.RECEIVERDESIG,
    ];

    const sp_proc = `CALL PP_50005(
            ${paramHeader[0]},
            '${paramHeader[1]}',
            '${paramHeader[2]}',
            '${paramHeader[3]}',
            '${paramHeader[4]}',
            '${paramHeader[5]}',
            '${paramHeader[6]}',
            '${paramHeader[7]}',
            '${paramHeader[8]}',
            '${paramHeader[9]}'
          )`;

    try {
      const result = await this.db.executeQuery(sp_proc);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  private async testMail(data: CreateMailerDto) {
    try {
      const result = await this.mailer.sendVoucherMail(data);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  private async sucessMail(data: SuccessMailerDto) {
    try {
      const result = await this.mailer.sendSuccessMail(data);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  private async rejectMail(data: SuccessMailerDto) {
    try {
      const result = await this.mailer.sendrejectMail(data);
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }
}
