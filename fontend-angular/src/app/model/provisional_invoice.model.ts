import { Customer } from "./customer.model";
import { Table } from "./table.model";

export class ProvisionalInvoice {
  id: number;
  dateTimeIn: string;
  dateTimePrintInvoice: string;
  totalMoney: number;
  discount: number;
  surcharge: number;
  customer: Customer;
  tables: Table;
}
