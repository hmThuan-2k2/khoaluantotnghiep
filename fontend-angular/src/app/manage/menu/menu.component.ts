import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/menu.model';
import { MenuGroup } from 'src/app/model/menu_group.model';
import { Table } from 'src/app/model/table.model';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { MenuGroupService } from 'src/app/service/menu-group.service';
import { MenuService } from 'src/app/service/menu.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private TableService: TableService,
    private MenuService: MenuService,
    private MenuGroupService: MenuGroupService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id', 'image_Url', 'name_menu', 'price_sale', 'price_cost', 'unit', 'inventory', 'name_menu_group', 'action'];
  dataSource  = new MatTableDataSource<Menu>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllMenu();
  }

  public menuAll: Menu[] = null;

  public selectMenuGroup: number = null;
  public selectEditMenuGroup: number = null;
  public menuGroupAll: MenuGroup[] = null;
  public plusMenuGroupAdd: boolean = false;
  public plusMenuGroupEdit: boolean = false;
  public giaMin: number = null;
  public giaMax: number = null;


  public menuListSearchGia: Menu[] = null;

  public onRefresh(): void {
    this.getAllMenu();
    this.giaMax = null;
    this.giaMin = null
  }

  public onSearchGia(): void {
    // console.log(this.giaMin + "---" + this.giaMax);
    this.menuListSearchGia = [];
    if (this.giaMin != null) {
      if (this.giaMax != null) {
        this.menuAll.forEach(element => {
          if (
            element.price_cost >= this.giaMin
            && element.price_cost <= this.giaMax
          )
            this.menuListSearchGia.push(element);
          else if (
            element.price_sale >= this.giaMin
            && element.price_sale <= this.giaMax
          )
            this.menuListSearchGia.push(element);
        });
      }
      else {
        this.menuAll.forEach(element => {
          if (
            element.price_cost >= this.giaMin
          )
            this.menuListSearchGia.push(element);
          else if (
            element.price_sale >= this.giaMin
          )
            this.menuListSearchGia.push(element);
        });
      }
    }
    else {
      if (this.giaMax != null) {
        this.menuAll.forEach(element => {
          if (
            element.price_cost <= this.giaMax
          )
            this.menuListSearchGia.push(element);
          else if (
            element.price_sale <= this.giaMax
          )
            this.menuListSearchGia.push(element);
        });
      }
      else {
        this.menuListSearchGia = this.menuAll
      }
    }
    // console.log(this.menuListSearchGia);
    this.dataSource = new MatTableDataSource<Menu>(this.menuListSearchGia);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onTruePlusMenuGroupAdd():void {
    this.plusMenuGroupAdd = true;
  }

  public onTruePlusMenuGroupEdit():void {
    this.plusMenuGroupEdit = true;
  }

  public onFalsePlusMenuGroupAdd():void {
    this.plusMenuGroupAdd = false;
  }

  public onFalsePlusMenuGroupEdit():void {
    this.plusMenuGroupEdit = false;
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

  public onChangeSelectMenuGroup(newValue) {
    // console.log(newValue);
    this.selectMenuGroup = newValue;
  }

  public onChangeSelectEditMenuGroup(newValue) {
    // console.log(newValue);
    this.selectEditMenuGroup = newValue;
  }

  public getAllMenu(): void {
    this.functions_login.getUserProfile();
    this.MenuService.getAllMenu().subscribe(
      (response: HttpResponse<any>) => {
        this.menuAll = response.body;
        this.dataSource = new MatTableDataSource<Menu>(this.menuAll);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllMenuGroup();
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

  public onOpenModal(menu: Menu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.menuAddDefault = {
        name_menu: "",
        price_sale: "",
        price_cost: "",
        unit: "",
        image_Url: "",
        inventory: "",
        id_menu_group: this.selectMenuGroup
      };
      this.selectMenuGroup = null;
      this.plusMenuGroupAdd = false;
      button.setAttribute('data-target', '#addMenuModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateMenuModal');
      this.editMenu = menu;
      this.menuEditDefault = menu;
      this.imgLinkEdit = menu.image_Url;
      this.selectEditMenuGroup = menu.menu_group?.id;
      this.plusMenuGroupEdit = false;
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteMenuModal');
      this.deleteMenu = menu;
    }
    container.appendChild(button);
    button.click();
  }

  checkFileImage(type: string): boolean {
    var check = type.includes("image");
    return check;
  }

  public errorFile = false;

  public imgLink: string = null;

  async onFileAdd(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.checkFileImage(file.type)) {
        this.errorFile = false;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thuan_dendau');
        var value = await this.MenuService.uploadSignature(formData).toPromise();
        // console.log(value);
        this.imgLink = value.url;
      }
      else {
        this.errorFile = true;
        this.imgLink = null;
      }
    }
  }

  public async addMenu(addMenuForm: NgForm): Promise<void> {
    if (this.plusMenuGroupAdd) {
      console.log(addMenuForm.value);
      var dataMenuGroupAdd = {
        name_menu_group: addMenuForm.value.name_menu_group
      }
      var value = await this.MenuGroupService.saveMenuGroup(dataMenuGroupAdd).toPromise();
      var dataTrue = {
        name_menu: addMenuForm.value.name_menu,
        price_sale: addMenuForm.value.price_sale,
        price_cost: addMenuForm.value.price_cost,
        unit: addMenuForm.value.unit,
        image_Url: addMenuForm.value.image_Url,
        inventory: addMenuForm.value.inventory,
        id_menu_group: value.body.id
      };
      console.log(dataTrue);
      this.MenuService.saveMenu(dataTrue).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response.body);
          this.getAllMenu();
          this._snackBar.openSnackBarSuccess("Thêm thực đơn mới thành công!");
          var file_add = document.getElementById("file-add-btn")as HTMLButtonElement;
          file_add.value = "";
          this.plusMenuGroupAdd = false;
        },
        (error: HttpErrorResponse) => {
          this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
          console.log(error.message);
        }
      );
      document.getElementById('add-menu-form').click();
      // addForm.resetForm();
    }
    else {
      console.log(addMenuForm.value);
      var dataFalse = {
        name_menu: addMenuForm.value.name_menu,
        price_sale: addMenuForm.value.price_sale,
        price_cost: addMenuForm.value.price_cost,
        unit: addMenuForm.value.unit,
        image_Url: addMenuForm.value.image_Url,
        inventory: addMenuForm.value.inventory,
        id_menu_group: this.selectMenuGroup
      };

      console.log(dataFalse);
      this.MenuService.saveMenu(dataFalse).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response.body);
          this.getAllMenu();
          this._snackBar.openSnackBarSuccess("Thêm thực đơn mới thành công!");
          var file_add = document.getElementById("file-add-btn")as HTMLButtonElement;
          file_add.value = "";
          this.plusMenuGroupAdd = false;
        },
        (error: HttpErrorResponse) => {
          this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
          console.log(error.message);
        }
      );
      document.getElementById('add-menu-form').click();
      // addForm.resetForm();
    }

  }

  public menuAddDefault = null;

  checkIsAdd(addForm: NgForm): boolean {
    let check = false;
    // console.log(addForm.value);
    if (addForm.value != null && this.menuAddDefault != null) {
      if (
        addForm.value?.name_menu != this.menuAddDefault.name_menu &&
        addForm.value?.name_menu != null
      )
        check = true;
      if (
        addForm.value?.price_sale != this.menuAddDefault.price_sale &&
        addForm.value?.price_sale != null
      )
        check = true;
      if (
        addForm.value?.price_cost != this.menuAddDefault.price_cost &&
        addForm.value?.price_cost != null
      )
        check = true;
      if (
        addForm.value?.unit != this.menuAddDefault.unit &&
        addForm.value?.unit != null
      )
        check = true;
      if (
        addForm.value?.inventory != this.menuAddDefault.inventory &&
        addForm.value?.inventory != null
      )
        check = true;
      if (
        addForm.value?.image_Url != this.menuAddDefault.image_Url &&
        addForm.value?.image_Url != null
      )
        check = true;
      // if (
      //   addForm.value?.image_Url != this.menuAddDefault.image_Url &&
      //   addForm.value?.image_Url != null
      // )
      //   check = true;
    }
    // console.log(check);
    // if (check)
    //   this.isUpdate = check;
    return check;
  }

  setDefaultAddForm(addForm: NgForm) {
    addForm.resetForm();
    var file_add = document.getElementById("file-add-btn")as HTMLButtonElement;
    file_add.value = "";
    this.errorFile = false;
    this.imgLink = null;
  }

  public editMenu: Menu = null;

  public errorFileEdit = false;
  public imgLinkEdit: string = null;

  async onFileUpdate(event) {
    var file: File = event.target.files[0];
    if (file) {
      if (this.checkFileImage(file.type)) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thuan_dendau');
        console.log(formData);
        var value = await this.MenuService.uploadSignature(formData).toPromise();
        // console.log(value);
        this.imgLinkEdit = value.url;
        this.errorFileEdit = false;
      }
      else {
        this.errorFileEdit = true;
        this.imgLinkEdit = null;
      }
    }
  }

  public async onUpdateMenu(menuForm: NgForm): Promise<void> {
    console.log(menuForm.value);
    if (this.plusMenuGroupEdit) {
      console.log(menuForm.value);
      var dataMenuGroupEdit = {
        name_menu_group: menuForm.value.name_menu_group
      }
      var value = await this.MenuGroupService.saveMenuGroup(dataMenuGroupEdit).toPromise();
      var dataTrue = {
        id: menuForm.value.id,
        name_menu: menuForm.value.name_menu,
        price_sale: menuForm.value.price_sale,
        price_cost: menuForm.value.price_cost,
        unit: menuForm.value.unit,
        image_Url: menuForm.value.image_Url,
        inventory: menuForm.value.inventory,
        id_menu_group: value.body.id
      };
      console.log(dataTrue);
      this.MenuService.saveMenu(dataTrue).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response.body);
          this.getAllMenu();
          this._snackBar.openSnackBarSuccess("Cập nhật thông tin thực đơn thành công!");
          var file_edit = document.getElementById("file-edit-btn")as HTMLButtonElement;
          file_edit.value = "";
          this.plusMenuGroupEdit = false;
        },
        (error: HttpErrorResponse) => {
          this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
          console.log(error.message);
        }
      );
      document.getElementById('edit-menu-form').click();
      // addForm.resetForm();
    }
    else {
      console.log(menuForm.value);
      var dataFalse = {
        id: menuForm.value.id,
        name_menu: menuForm.value.name_menu,
        price_sale: menuForm.value.price_sale,
        price_cost: menuForm.value.price_cost,
        unit: menuForm.value.unit,
        image_Url: menuForm.value.image_Url,
        inventory: menuForm.value.inventory,
        id_menu_group: this.selectEditMenuGroup
      };

      console.log(dataFalse);
      this.MenuService.saveMenu(dataFalse).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response.body);
          this.getAllMenu();
          this._snackBar.openSnackBarSuccess("Cập nhật thông tin thực đơn thành công!");
          var file_edit = document.getElementById("file-edit-btn")as HTMLButtonElement;
          file_edit.value = "";
          this.plusMenuGroupEdit = false;
        },
        (error: HttpErrorResponse) => {
          this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
          console.log(error.message);
        }
      );
      document.getElementById('edit-menu-form').click();
      // addForm.resetForm();
    }
  }

  public menuEditDefault = null;

  checkIsUpdate(editForm: NgForm): boolean {
    let check = false;
    var name_menu: string = editForm.value?.name_menu;
    var price_sale: number = editForm.value?.price_sale;
    var price_cost: number = editForm.value?.price_cost;
    var unit: string = editForm.value?.unit;
    var inventory: number = editForm.value?.inventory;
    var image_Url: string = editForm.value?.image_Url;
    if (editForm.value != null && this.menuEditDefault != null) {
      if (name_menu != this.menuEditDefault?.name_menu)
        check = true;
      if (price_sale != this.menuEditDefault?.price_sale.toString())
        check = true;
      if (price_cost != this.menuEditDefault?.price_cost)
        check = true;
      if (unit != this.menuEditDefault?.unit)
        check = true;
      if (inventory != this.menuEditDefault?.inventory)
        check = true;
      if (image_Url != this.menuEditDefault?.image_Url)
        check = true;
      // if (editForm.value?.image_Url != this.menuEditDefault?.image_Url)
      //   check = true;
      // console.log(check);
      // console.log(editForm.value);
      // console.log(this.menuEditDefault);
    }
    return check;
  }

  setDefaultEditForm(editForm: NgForm) {
    console.log(editForm.value);
    editForm.resetForm({
      name_menu: this.menuEditDefault.name_menu,
      price_sale: this.menuEditDefault.price_sale,
      price_cost: this.menuEditDefault.price_cost,
      unit: this.menuEditDefault.unit,
      name: this.menuEditDefault.name,
      image_Url: this.menuEditDefault.image_Url,
      inventory: this.menuEditDefault.inventory,
      id_menu_group: this.menuEditDefault.menu_group.id
      // image_Url: this.menuEditDefault.image_Url,
    });
    this.imgLinkEdit = this.menuEditDefault.image_Url;
    var file_edit = document.getElementById("file-edit-btn")as HTMLButtonElement;
    file_edit.value = "";
    this.errorFileEdit = false;
  }

  public deleteMenu: Menu = null;

  public onDeleteMenu(menu: Menu): void {
    console.log(menu);
    this.MenuService.deleteMenu(menu.id).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response.body);
        this.getAllMenu();
        var value = response.body;
        if (value.trangThai == 1)
          this._snackBar.openSnackBarSuccess(value.message);
        else if (value.trangThai == 2)
          this._snackBar.openSnackBarWarning(value.message);
      },
      (error: HttpErrorResponse) => {
        this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
        console.log(error.message);
      }
    );

    // this.MenuService.delete(product.id).subscribe(
    //   (response: any) => {
    //     // console.log(response);
    //     this.getProduct();
    //     this._snackBar.openSnackBarSuccess(response);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
    //     console.log(error.message);
    //   }
    // );
  }
}
