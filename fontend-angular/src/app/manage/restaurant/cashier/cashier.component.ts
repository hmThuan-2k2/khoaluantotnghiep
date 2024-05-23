import { CustomerService } from './../../../service/customer.service';
import { PrintService } from './../../../service/print.service';
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
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/model/customer.model';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css'],
})
export class CashierComponent implements OnInit {
  constructor(
    private TableService: TableService,
    private MenuGroupService: MenuGroupService,
    private MenuService: MenuService,
    private ProvisionalInvoiceService: ProvisionalInvoiceService,
    private TableMenuService: TableMenuService,
    private CustomerService: CustomerService,
    private printService: PrintService,
    private loginService: LoginService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) {}

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
  public selectProvisionalInvoice: ProvisionalInvoice = null;
  public editTableMenu: TableMenu = null;
  public soLuongEditTableMenu: number;
  public deleteTableMenu: TableMenu = null;
  public editTableMenuDefault: TableMenu = null;
  public surchargeProvisionalInvoice: number = 0;
  public discountProvisionalInvoice: number = 0;
  public idCutomerProvisionalInvoice: number = 0;
  public customerAll: Customer[] = null;

  public saveTablePrintProvisionalInvoice() : void {
    var data = {
      id: this.selectTable.id,
      name: this.selectTable.name,
      isEmpty: this.selectTable.isEmpty,
      isTemporaryInvoice: 1,
      isProcessingNewspaper: this.selectTable.isProcessingNewspaper,
      totalInvoice: this.selectTable.totalInvoice,
      table_menu: this.selectTable.table_menu
    }
    this.functions_login.getUserProfile();
    this.TableService.saveTable(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllTable();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public async onPrintProvisionalInvoice(){
    this.isThongTinHoaDon = false;
    this.isBan = true;
    this.isMenu = false;
    this.printProvisionalInvoice(this.selectProvisionalInvoice?.id);
    await this.saveProvisionalInvoice();
    this.saveTablePrintProvisionalInvoice();
  }

  public onUpdateProvisionalInvoice(): void {
    let provisionalInvoice: ProvisionalInvoice = null;
    const data = {
      id: this.selectProvisionalInvoice?.id,
      discount: this.discountProvisionalInvoice,
      surcharge: this.surchargeProvisionalInvoice,
      idCustomer: this.idCutomerProvisionalInvoice,
      idTable: this.selectTable?.id,
    };
    this.functions_login.getUserProfile();
    this.ProvisionalInvoiceService.saveProvisionalInvoice(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response.body);
        provisionalInvoice = response.body;
        this.selectProvisionalInvoice = provisionalInvoice;
        this.surchargeProvisionalInvoice = this.selectProvisionalInvoice.surcharge;
        this.discountProvisionalInvoice = this.selectProvisionalInvoice.discount;
        if (this.selectProvisionalInvoice?.customer?.id == null)
          this.idCutomerProvisionalInvoice = 0;
        else this.idCutomerProvisionalInvoice = this.selectProvisionalInvoice?.customer?.id;
        this._snackBar.openSnackBarSuccess("Cập nhật hoá đơn thành công!");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public onChangeSelectCustomer(newValue) {
    console.log(newValue);
    this.idCutomerProvisionalInvoice = newValue;
  }

  public getAllCustomer(): void {
    this.functions_login.getUserProfile();
    this.CustomerService.getAllCustomer().subscribe(
      (response: HttpResponse<any>) => {
        this.customerAll = response.body;
        console.log(this.customerAll);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }
  public getSurchargeProvisionalInvoice(): void {

  }

  public async onThongTinHoaDon(): Promise<void> {
    if (this.selectTable != null) {
      if (this.selectTable.isEmpty == false) {
        await this.saveProvisionalInvoice();
        this.isThongTinHoaDon = !this.isThongTinHoaDon;
        this.isBan = true;
        this.isMenu = false;
      }
      else this._snackBar.openSnackBarWarning("Bàn chưa có hoá đơn, vui lòng order thực đơn để tạo!")
    }
    else this._snackBar.openSnackBarWarning("Bạn cần chọn bàn để xem thông tin hoá đơn!");
  }

  printProvisionalInvoice(id: number) {
    const provisionalinvoiceIds: string[] = [id.toString()];
    this.printService.printDocument(
      'provisionalinvoice',
      provisionalinvoiceIds
    );
  }

  checkIsUpdateTableMenu(editForm: NgForm): boolean {
    let check = false;
    if (editForm.value != null && this.editTableMenuDefault != null) {
      if (editForm.value?.amount != this.editTableMenuDefault?.amount)
        check = true;
      if (editForm.value?.note != this.editTableMenuDefault?.note) check = true;
    }
    return check;
  }

  public getDeleteTableMenu(item: TableMenu): void {
    var tableMenu: TableMenu = null;
    const data = {
      id: {
        tableId: item.id.tableId,
        menuId: item.id.menuId,
      },
    };
    this.functions_login.getUserProfile();
    this.TableMenuService.deleteTableMenu(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllTable();
        this._snackBar.openSnackBarSuccess('Bạn đã xoá thành công!');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public getUpdateTableMenu(item: any): void {
    document.getElementById('btn-close-edit-tablemenu').click();
    var tableMenu: TableMenu = null;
    const data = {
      id: {
        tableId: item.tableId,
        menuId: item.menuId,
      },
      amount: item.amount,
      price_unit: item.price_unit,
      isCooking: item.isCooking,
      note: item.note,
    };
    // console.log(data);
    this.functions_login.getUserProfile();
    this.TableMenuService.saveTableMenu(data).subscribe(
      (response: HttpResponse<any>) => {
        tableMenu = response.body;
        // console.log(tableMenu);
        this.editTableMenu = tableMenu;
        this.getAllTable();
        this.saveProvisionalInvoice();
        this._snackBar.openSnackBarSuccess('Bạn đã cập nhật thành công!');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }

  setDefaultModalTableMenu(ngForm: NgForm) {
    ngForm.resetForm({
      tableId: this.editTableMenu?.id.tableId,
      menuId: this.editTableMenu?.id.menuId,
      amount: this.editTableMenu?.amount,
      price_unit: this.editTableMenu?.price_unit,
      isCooking: this.editTableMenu?.isCooking,
      note: this.editTableMenu?.note,
    });
  }

  congSoLuongEditTableMenu(): void {
    this.soLuongEditTableMenu += 1;
  }

  truSoLuongEditTableMenu(): void {
    this.soLuongEditTableMenu -= 1;
    if (this.soLuongEditTableMenu == 0) this.soLuongEditTableMenu = 1;
  }

  public onOpenModalTableMenu(data: TableMenu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editTableMenu = new TableMenu(
        data.id,
        data.amount,
        data.price_unit,
        data.isCooking,
        data.note,
        data.table,
        data.menu
      );
      this.editTableMenuDefault = this.editTableMenu;
      this.soLuongEditTableMenu = data.amount;
      // console.log(this.editTableMenu);
      // console.log(this.editTableMenuDefault);
      button.setAttribute('data-target', '#updateTableMenuModal');
    }
    if (mode === 'delete') {
      this.deleteTableMenu = data;
      button.setAttribute('data-target', '#deleteTableMenuModal');
    }
    container.appendChild(button);
    button.click();
  }

  public selectTableMenuByMenu(menu: Menu): void {
    if (this.selectTable != null) {
      var tableMenu: TableMenu = null;
      const data = {
        id: {
          tableId: this.selectTable.id,
          menuId: menu.id,
        },
      };
      this.functions_login.getUserProfile();
      this.TableMenuService.selectTableMenuId(data).subscribe(
        (response: HttpResponse<any>) => {
          tableMenu = response.body;
          // console.log(tableMenu);
          this.getAllTable();
          this.postProvisionalInvoice();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning(
              'Token đã hết hạn! Chờ cấp token mới!'
            );
            this.functions_login.refreshToken();
          }
        }
      );
    } else {
      this._snackBar.openSnackBarWarning('Bạn chưa chọn bàn!!!');
    }
  }

  public getAllProvisionalInvoice(): void {
    this.functions_login.getUserProfile();
    this.ProvisionalInvoiceService.getAllProvisionalInvoice().subscribe(
      (response: HttpResponse<any>) => {
        this.provisionalInvoiceAll = response.body;
        console.log(response);
        console.log(this.provisionalInvoiceAll);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public postProvisionalInvoice(): void {
    if (this.selectTable.isEmpty) {
      let provisionalInvoice: ProvisionalInvoice = null;
      // var today = new Date();
      // var dateNow =
      //   today.getDate() +
      //   '/' +
      //   (today.getMonth() + 1) +
      //   '/' +
      //   today.getFullYear();
      // var timeNow =
      //   today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      const data = {
        // id: idProvisionalInvoice,
        // timeIn: dateNow + ' - ' + timeNow,
        // timeOut: null,
        // timePrintInvoice: null,
        // totalMoney: null,
        discount: 0,
        surcharge: 0,
        idCustomer: 0,
        idTable: this.selectTable.id,
      };
      this.functions_login.getUserProfile();
      this.ProvisionalInvoiceService.saveProvisionalInvoice(data).subscribe(
        (response: HttpResponse<any>) => {
          provisionalInvoice = response.body;
          this.selectProvisionalInvoice = provisionalInvoice;
          this.surchargeProvisionalInvoice = this.selectProvisionalInvoice.surcharge;
          this.discountProvisionalInvoice = this.selectProvisionalInvoice.discount;
          if (this.selectProvisionalInvoice?.customer?.id == null)
            this.idCutomerProvisionalInvoice = 0;
          else this.idCutomerProvisionalInvoice = this.selectProvisionalInvoice?.customer?.id;
          console.log('post 1');
          console.log(provisionalInvoice);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning(
              'Token đã hết hạn! Chờ cấp token mới!'
            );
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  public async saveProvisionalInvoice(): Promise<void> {
    if (this.selectTable != null && this.selectTable.isEmpty == false) {
      let provisionalInvoice: ProvisionalInvoice = null;
      var idProvisionalInvoice: number = null;
      this.provisionalInvoiceAll.forEach((element) => {
        if (element.tables.id == this.selectTable.id)
          idProvisionalInvoice = element.id;
      });
      const dataId = {
        id: idProvisionalInvoice,
      };
      var value = await this.ProvisionalInvoiceService.getProvisionalInvoiceId(
        dataId
      ).toPromise();
      provisionalInvoice = value.body;
      console.log('save 1');
      console.log(provisionalInvoice);
      // var dateTimeIn: Date = provisionalInvoice.dateTimeIn;
      // var dateNow =
      //   dateTimeIn.getDate() +
      //   '/' +
      //   (dateTimeIn.getMonth() + 1) +
      //   '/' +
      //   dateTimeIn.getFullYear();
      // var timeNow =
      //   dateTimeIn.getHours() +
      //   ':' +
      //   dateTimeIn.getMinutes() +
      //   ':' +
      //   dateTimeIn.getSeconds();
      console.log(provisionalInvoice.dateTimeIn);
      const data = {
        id: idProvisionalInvoice,
        discount: provisionalInvoice?.discount,
        surcharge: provisionalInvoice?.surcharge,
        idCustomer: provisionalInvoice?.customer?.id,
        idTable: this.selectTable?.id,
      };
      this.functions_login.getUserProfile();
      this.ProvisionalInvoiceService.saveProvisionalInvoice(data).subscribe(
        (response: HttpResponse<any>) => {
          provisionalInvoice = response.body;
          this.selectProvisionalInvoice = provisionalInvoice;
          this.surchargeProvisionalInvoice = this.selectProvisionalInvoice.surcharge;
          this.discountProvisionalInvoice = this.selectProvisionalInvoice.discount;
          if (this.selectProvisionalInvoice?.customer?.id == null)
            this.idCutomerProvisionalInvoice = 0;
          else this.idCutomerProvisionalInvoice = this.selectProvisionalInvoice?.customer?.id;
          // console.log(this.selectProvisionalInvoice);
          console.log('save 2');
          console.log(provisionalInvoice);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning(
              'Token đã hết hạn! Chờ cấp token mới!'
            );
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
    // console.log(newValue);
    this.selectMenuGroup = newValue;
    this.getMenuDisplay();
  }

  public getMenuDisplay(): void {
    this.functions_login.getUserProfile();
    if (this.selectMenuGroup == 0) {
      this.MenuService.getAllMenu().subscribe(
        (response: HttpResponse<any>) => {
          this.menuDisplay = response.body;
          // console.log(this.menuDisplay);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning(
              'Token đã hết hạn! Chờ cấp token mới!'
            );
            this.functions_login.refreshToken();
          }
        }
      );
    } else {
      const data = {
        id: this.selectMenuGroup,
      };
      this.MenuService.getAllMenuFindIdMenuGroup(data).subscribe(
        (response: HttpResponse<any>) => {
          this.menuDisplay = response.body;
          // console.log(this.menuDisplay);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning(
              'Token đã hết hạn! Chờ cấp token mới!'
            );
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  public getAllMenuGroup(): void {
    this.functions_login.getUserProfile();
    this.MenuGroupService.getAllMenuGroup().subscribe(
      (response: HttpResponse<any>) => {
        this.menuGroupAll = response.body;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
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
        this.tableAll.forEach((element) => {
          if (element.isEmpty == false) this.lengthTableNotEmpty += 1;
        });
        // console.log(this.lengthTableNotEmpty);
        this.getAllCustomer();
        this.getAllProvisionalInvoice();
        this.getAllMenuGroup();
        this.getMenuDisplay();
        this.selectTableButtonDefault();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning(
            'Token đã hết hạn! Chờ cấp token mới!'
          );
          this.functions_login.refreshToken();
        }
      }
    );
  }

  public selectTableButtonDefault(): void {
    if (this.selectTable != null) {
      let tableNew: Table = null;
      this.tableAll.forEach((element) => {
        if (element.id == this.selectTable.id) tableNew = element;
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
      // console.log(this.selectTable);
      // console.log(this.tableMenuData);
    }
  }

  public selectTableButton(table: Table): void {
    if (table.isEmpty) {
      document
        .getElementById('table-btn-' + table.id)
        .classList.remove('btn', 'btn-secondary');
      document
        .getElementById('table-btn-' + table.id)
        .classList.add('btn', 'btn-primary');
    } else {
      document
        .getElementById('table-btn-' + table.id)
        .classList.remove('btn', 'btn-danger');
      document
        .getElementById('table-btn-' + table.id)
        .classList.add('btn', 'btn-primary');
    }
    if (this.selectTable != null && this.selectTable.id != table.id) {
      if (this.selectTable.isEmpty) {
        document
          .getElementById('table-btn-' + this.selectTable?.id)
          .classList.remove('btn', 'btn-primary');
        document
          .getElementById('table-btn-' + this.selectTable?.id)
          .classList.add('btn', 'btn-secondary');
      } else {
        document
          .getElementById('table-btn-' + this.selectTable?.id)
          .classList.remove('btn', 'btn-primary');
        document
          .getElementById('table-btn-' + this.selectTable?.id)
          .classList.add('btn', 'btn-danger');
      }
    }
    this.selectTable = table;
    // console.log(this.selectTable);
    this.tableMenuData = this.selectTable.table_menu;
    // console.log(this.tableMenuData);
    if (this.selectTable.isEmpty == false) this.saveProvisionalInvoice();
  }
}
