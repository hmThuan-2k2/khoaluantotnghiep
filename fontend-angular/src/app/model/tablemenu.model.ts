import { Menu } from './menu.model';
import { Table } from './table.model';
import { TableMenuKey } from './tablemenukey.model';

export class TableMenu {
  id: TableMenuKey;
  amount: number;
  amount_cooking: number;
  price_unit: number;
  isCooking: boolean;
  note: string;
  table: Table;
  menu: Menu;
  constructor(
    id: TableMenuKey,
    amount: number,
    amount_cooking: number,
    price_unit: number,
    isCooking: boolean,
    note: string,
    table: Table,
    menu: Menu
  ) {
    this.id = id;
    this.amount = amount;
    this.amount_cooking = amount_cooking;
    this.price_unit = price_unit;
    this.isCooking = isCooking;
    this.note = note;
    this.table = table;
    this.menu = menu;
  }
}
