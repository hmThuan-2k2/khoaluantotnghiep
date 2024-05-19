import { TableMenu } from "./tablemenu.model";

export class Table {
  id: number;
  name: string;
  isEmpty: boolean;
  isTemporaryInvoice: boolean;
  isProcessingNewspaper: boolean;
  totalInvoice: number;
  table_menu: TableMenu[];
}
