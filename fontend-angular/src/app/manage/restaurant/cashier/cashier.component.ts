import { TableMenuService } from './../../../service/table-menu.service';
import { ProvisionalInvoiceService } from './../../../service/provisional-invoice.service';
import { ProvisionalInvoice } from './../../../model/provisional_invoice.model';
import { MenuService } from './../../../service/menu.service';
import { Table } from 'src/app/model/table.model';
import { TableService } from './../../../service/table.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { Router } from '@angular/router';
import { MenuGroup } from 'src/app/model/menu_group.model';
import { MenuGroupService } from 'src/app/service/menu-group.service';
import { Menu } from 'src/app/model/menu.model';
import { TableMenu } from 'src/app/model/tablemenu.model';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  constructor(
    private TableService: TableService,
    private MenuGroupService: MenuGroupService,
    private MenuService: MenuService,
    private ProvisionalInvoiceService: ProvisionalInvoiceService,
    private TableMenuService: TableMenuService,
    private loginService: LoginService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllTable();
  }

  public tableAll: Table[] = null;
  public lengthTableAll: number = null;
  public lengthTableNotEmpty: number = null;
  public selectTable: Table = null;
  public isBan: boolean = true;
  public isMenu: boolean = !this.isBan;
  public isThongTinHoaDon: boolean = false;
  public menuGroupAll: MenuGroup[] = null;
  public selectMenuGroup: number = 0;
  public menuDisplay: Menu[] = null;
  public tableMenuData: TableMenu[] = null;
  public provisionalInvoiceAll: ProvisionalInvoice[] = null;

  public selectTableMenuByMenu(menu: Menu): void {
    if (this.selectTable != null) {
      var tableMenu : TableMenu = null;
      const data = {
        id: {
          tableId: this.selectTable.id,
          menuId: menu.id
        }
      }
      this.TableMenuService.selectTableMenuId(data).subscribe(
        (response: HttpResponse<any>) => {
          tableMenu = response.body;
          console.log(tableMenu);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
      this.postProvisionalInvoice();
      this.getAllTable();
    }
    else {
      this._snackBar.openSnackBarWarning("Bạn chưa chọn bàn!!!")
    }
  }

  public getAllProvisionalInvoice(): void {
    this.ProvisionalInvoiceService.getAllProvisionalInvoice().subscribe(
      (response: HttpResponse<any>) => {
        this.provisionalInvoiceAll = response.body;
        // console.log(response);
        console.log(this.provisionalInvoiceAll);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public postProvisionalInvoice(): void {
    if (this.selectTable.isEmpty) {
      let provisionalInvoice: ProvisionalInvoice = null;
      var today = new Date();
      var dateNow = today.getDate() + '/' + ( today.getMonth() + 1 ) + '/' + today.getFullYear();
      var timeNow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const data = {
        // id: idProvisionalInvoice,
        timeIn: dateNow + " - " + timeNow,
        timeOut: null,
        timePrintInvoice: null,
        totalMoney: null,
        discount: 0,
        surcharge: 0,
        idCustomer: 0,
        idTable: this.selectTable.id
      }
      this.ProvisionalInvoiceService.saveProvisionalInvoice(data).subscribe(
        (response: HttpResponse<any>) => {
          provisionalInvoice = response.body;
          console.log(provisionalInvoice);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  public saveProvisionalInvoice(): void {
    if (this.selectTable != null) {
      let provisionalInvoice: ProvisionalInvoice = null;
      var idProvisionalInvoice: number = null;
      this.provisionalInvoiceAll.forEach(element => {
        if (element.tables.id == this.selectTable.id)
          idProvisionalInvoice = element.id;
      });
      const dataId = {
        id: idProvisionalInvoice
      };
      this.ProvisionalInvoiceService.getProvisionalInvoiceId(dataId).subscribe(
        (response: HttpResponse<any>) => {
          provisionalInvoice = response.body;
          console.log(provisionalInvoice);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
      const data = {
        id: idProvisionalInvoice,
        timeIn: provisionalInvoice?.timeIn,
        timeOut: provisionalInvoice?.timeOut,
        timePrintInvoice: provisionalInvoice?.timePrintInvoice,
        totalMoney: provisionalInvoice?.totalMoney,
        discount: provisionalInvoice?.discount,
        surcharge: provisionalInvoice?.surcharge,
        idCustomer: provisionalInvoice?.idCustomer,
        idTable: this.selectTable?.id
      }
      this.ProvisionalInvoiceService.saveProvisionalInvoice(data).subscribe(
        (response: HttpResponse<any>) => {
          provisionalInvoice = response.body;
          console.log(provisionalInvoice);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  public onBan(): void {
    this.isBan = true;
    this.isMenu = false;
  }

  public onMenu(): void {
    this.isBan = false;
    this.isMenu = true;
  }

  public onChangeSelectMenuGroup(newValue) {
    console.log(newValue);
    this.selectMenuGroup = newValue;
    this.getMenuDisplay();
  }

  public getMenuDisplay(): void {
    if (this.selectMenuGroup == 0) {
      this.MenuService.getAllMenu().subscribe(
        (response: HttpResponse<any>) => {
          this.menuDisplay = response.body;
          console.log(this.menuDisplay);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
    }
    else {
      const data = {
        id: this.selectMenuGroup
      };
      this.MenuService.getAllMenuFindIdMenuGroup(data).subscribe(
        (response: HttpResponse<any>) => {
          this.menuDisplay = response.body;
          console.log(this.menuDisplay);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  public getAllMenuGroup(): void {
    this.MenuGroupService.getAllMenuGroup().subscribe(
      (response: HttpResponse<any>) => {
        this.menuGroupAll = response.body;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public getAllTable(): void {
    this.functions_login.getUserProfile();
    this.TableService.getAllTable().subscribe(
      (response: HttpResponse<any>) => {
        // console.log(response);
        // console.log(response.body);
        this.tableAll = response.body;
        this.lengthTableAll = this.tableAll.length;
        // console.log(this.tableAll);
        this.lengthTableNotEmpty = 0;
        this.tableAll.forEach(element => {
          if (element.isEmpty == false)
              this.lengthTableNotEmpty += 1;
        });
        // console.log(this.lengthTableNotEmpty);
        this.selectTableButtonDefault();
        this.getAllProvisionalInvoice();
        this.getAllMenuGroup();
        this.getMenuDisplay();
        this.saveProvisionalInvoice();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
          this.functions_login.refreshToken();
        }
      }
    )
  }

  public selectTableButtonDefault(): void {
    if (this.selectTable != null) {
      let tableNew: Table = null;
      this.tableAll.forEach(element => {
        if (element.id == this.selectTable.id)
            tableNew = element;
      });
      // console.log(tableNew);
      // if (tableNew.isEmpty) {
      //   document.getElementById('table-btn-' + tableNew.id).classList.remove('btn', 'btn-secondary');
      //   document.getElementById('table-btn-' + tableNew.id).classList.add('btn', 'btn-primary');
      // }
      // else {
      //   document.getElementById('table-btn-' + tableNew.id).classList.remove('btn', 'btn-danger');
      //   document.getElementById('table-btn-' + tableNew.id).classList.add('btn', 'btn-primary');
      // }
      this.selectTable = tableNew;
      this.tableMenuData = this.selectTable.table_menu;
    }
  }

  public selectTableButton(table: Table): void {
    if (table.isEmpty) {
      document.getElementById('table-btn-' + table.id).classList.remove('btn', 'btn-secondary');
      document.getElementById('table-btn-' + table.id).classList.add('btn', 'btn-primary');
    }
    else {
      document.getElementById('table-btn-' + table.id).classList.remove('btn', 'btn-danger');
      document.getElementById('table-btn-' + table.id).classList.add('btn', 'btn-primary');
    }
    if (this.selectTable != null) {
      if (this.selectTable.isEmpty) {
        document.getElementById('table-btn-' + this.selectTable?.id).classList.remove('btn', 'btn-primary');
        document.getElementById('table-btn-' + this.selectTable?.id).classList.add('btn', 'btn-secondary');
      }
      else {
        document.getElementById('table-btn-' + this.selectTable?.id).classList.remove('btn', 'btn-primary');
        document.getElementById('table-btn-' + this.selectTable?.id).classList.add('btn', 'btn-danger');
      }
    }
    this.selectTable = table;
    // console.log(this.selectTable);
    this.tableMenuData = this.selectTable.table_menu;
    // console.log(this.tableMenuData);
  }
}
