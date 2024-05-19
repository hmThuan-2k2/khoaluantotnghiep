import { Menu } from "./menu.model";
import { Table } from "./table.model";
import { TableMenuKey } from "./tablemenukey.model";

export class TableMenu {
  id: TableMenuKey;
  amount: number;
  price_unit: number;
  isCooking: boolean;
  note: string;
  table: Table;
  menu: Menu;
}
