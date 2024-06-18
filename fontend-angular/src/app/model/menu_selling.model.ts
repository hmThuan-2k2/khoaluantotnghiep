export class Menu_Selling {
  id: number;
  name_menu: string;
  sell_number: number;
  constructor(
    id: number,
    name_menu: string,
    sell_number: number
  ){
    this.id = id;
    this.name_menu = name_menu;
    this.sell_number = sell_number;
  }
}
