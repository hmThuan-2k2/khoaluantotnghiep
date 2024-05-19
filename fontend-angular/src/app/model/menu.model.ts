import { MenuGroup } from "./menu_group.model";
import { TableMenu } from "./tablemenu.model";

export class Menu {
  id: number;
  name_menu: string;
  price_sale: number;
  price_cost: number;
  unit: string;
  image_Url: string;
  inventory: number;
  menu_group: MenuGroup;
  table_menu: TableMenu[];
}
