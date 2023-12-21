import { Injectable } from '@nestjs/common';
import { HanaService } from 'src/hana/hana.service';
import { CreatePaymentVoucherDto } from './dto/paymentVoucher.dto';

@Injectable()
export class ProcedureService {
  constructor(private db: HanaService) {}

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

  async getPurchaseOrder(data: { vendorCode: string }) {
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

  async getApInvoice(data: { vendorCode: string }) {
    const sp_proc = `CALL PP_10027('${data.vendorCode}')`;
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
    paramHeader.push("'" + data.employee_code + "'");
    paramHeader.push("'" + data.purchase_order + "'");
    paramHeader.push("'" + data.ap_invoice + "'");
    paramHeader.push("'" + data.pay_to_others + "'");
    paramHeader.push("'" + data.vat_percent + "'");
    paramHeader.push("'" + data.user_id + "'");
    paramHeader.push("'" + user_log + "'");
    paramHeader.push("'" + data.status + "'");
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
        itemsParams.push("'" + item.department + "'");
        itemsParams.push("'" + item.division + "'");
        itemsParams.push("'" + item.product_line + "'");
        itemsParams.push("'" + item.gl_code + "'");
        itemsParams.push("'" + item.gl_name + "'");
        itemsParams.push("'" + item.description + "'");
        itemsParams.push("'" + item.total + "'");
        itemsParams.push("''");
        itemsParams.push("'y'");
        itemsParams.push("'" + JSON.stringify(item.attachments) + "'");
        const sp_proc_items = `CALL PP_50002(${itemsParams})`;
        await this.db.executeQuery(sp_proc_items);
      }
      return {
        result,
      };
    } catch (error) {
      console.error('Error executing SAP procedure:', error);
      throw error;
    }
  }

  async getPaymentVoucher(data: { userID: string }) {
    const sp_proc = `CALL PP_10031('${data.userID}')`;
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
}
