import { Table } from "./table.model";

export class ProvisionalInvoice {
  id: number;
  timeIn: string;
  timeOut: string;
  timePrintInvoice: string;
  totalMoney: number;
  discount: number;
  surcharge: number;
  idCustomer: number;
  tables: Table;
}
