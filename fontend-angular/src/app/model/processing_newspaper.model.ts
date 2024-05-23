import { Menu } from 'src/app/model/menu.model';
import { Table } from "./table.model";

export class ProcessingNewspaper {
  id: number;
  table: Table;
  menu: Menu;
  dateCreate: string;
  timeCreate: string;
  dateTimeCreate: string;
  dateTimeCompleted: string;
  isConfirm: boolean;
  amount_cooking: number;
  isCooking: boolean;
  note: String;
}
