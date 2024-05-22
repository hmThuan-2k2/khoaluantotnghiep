import { Table } from "./table.model";

export class ProvisionalInvoice {
  id: number;
  dateTimeIn: string;
  dateTimePrintInvoice: string;
  totalMoney: number;
  discount: number;
  surcharge: number;
  idCustomer: number;
  tables: Table;
}
