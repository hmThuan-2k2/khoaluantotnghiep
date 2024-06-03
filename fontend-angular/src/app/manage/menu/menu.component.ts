import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/menu.model';
import { Table } from 'src/app/model/table.model';
import { FunctionLoginService } from 'src/app/service/function-login.service';
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
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id', 'image_Url', 'name_menu', 'price_sale', 'price_cost', 'unit', 'inventory', 'menu_group', 'action'];
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

  public getAllMenu(): void {
    this.functions_login.getUserProfile();
    this.MenuService.getAllMenu().subscribe(
      (response: HttpResponse<any>) => {
        this.menuAll = response.body;
        this.dataSource = new MatTableDataSource<Menu>(this.menuAll);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      button.setAttribute('data-target', '#addMenuModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateMenuModal');
      this.getMenuEdit(menu.id);
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteMenuModal');
      this.getMenuDelete(menu.id);
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
        console.log(value);
        this.imgLink = value.url;
      }
      else {
        this.errorFile = true;
        this.imgLink = null;
      }
    }
  }

  public addMenu(addMenuForm: NgForm): void {
    console.log(addMenuForm.value);
    // this.productService.addProduct(addProductForm.value).subscribe(
    //   (response: string) => {
    //     // console.log(response);
    //     this.getProduct();
    //     this._snackBar.openSnackBarSuccess(response);
    //     var file_add = document.getElementById("file-add-btn")as HTMLButtonElement;
    //     file_add.value = "";
    //   },
    //   (error: HttpErrorResponse) => {
    //     this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
    //     console.log(error.message);
    //   }
    // );
    // document.getElementById('add-employee-form').click();
    // // addForm.resetForm();
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

  public getMenuEdit(id: number): void {
    this.functions_login.getUserProfile();
    this.MenuService.getDetailMenuId(id).subscribe(
      (response: HttpResponse<any>) => {
        this.editMenu = response.body;
        if (response.body == null) {
          this._snackBar.openSnackBarWarning(
            'Không tìm thấy sản phẩm để cập nhật!!!'
          );
          // document.getElementById('edit-product-form').click();
        }
        else {
          this.menuEditDefault = response.body;
          this.imgLinkEdit = response.body.imgLink;
        }
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

  public errorFileEdit = false;
  public imgLinkEdit: string = null;

  async onFileUpdate(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.checkFileImage(file.type)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'thuan-dendau');
        var value = await this.MenuService.uploadSignature(formData).toPromise();
        this.imgLinkEdit = value.url;
        this.errorFileEdit = false;
      }
      else {
        this.errorFileEdit = true;
        this.imgLinkEdit = null;
      }
    }
  }

  public onUpdateMenu(menuForm: NgForm): void {
    console.log(menuForm);
    // let product: Product = new Product(
    //   productForm.value.id,
    //   productForm.value.name,
    //   productForm.value.chiTiet,
    //   productForm.value.gia,
    //   productForm.value.soLuongTonKho,
    //   productForm.value.soLuongDaBan,
    //   productForm.value.imgLink
    // )
    // this.productService.updateProduct(product).subscribe(
    //   (response: string) => {
    //     // console.log(response);
    //     this.getProduct();
    //     this._snackBar.openSnackBarSuccess(response);
    //     document.getElementById('edit-product-form').click();
    //     var file_edit = document.getElementById("file-edit-btn")as HTMLButtonElement;
    //     file_edit.value = "";
    //   },
    //   (error: HttpErrorResponse) => {
    //     this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
    //     console.log(error.message);
    //   }
    // );
  }

  public menuEditDefault = null;

  checkIsUpdate(editForm: NgForm): boolean {
    let check = false;
    if (editForm.value != null && this.menuEditDefault != null) {
      if (editForm.value?.name_menu != this.menuEditDefault?.name_menu)
        check = true;
      if (editForm.value?.price_sale != this.menuEditDefault?.price_sale)
        check = true;
      if (editForm.value?.price_cost != this.menuEditDefault?.price_cost)
        check = true;
      if (editForm.value?.unit != this.menuEditDefault?.unit)
        check = true;
      if (editForm.value?.image_Url != this.menuEditDefault?.image_Url)
        check = true;
      // if (editForm.value?.image_Url != this.menuEditDefault?.image_Url)
      //   check = true;
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
      // image_Url: this.menuEditDefault.image_Url,
    });
    var file_edit = document.getElementById("file-edit-btn")as HTMLButtonElement;
    file_edit.value = "";
    this.errorFileEdit = false;
  }

  public deleteMenu: Menu = null;

  public getMenuDelete(id: number): void {
    this.functions_login.getUserProfile();
    this.MenuService.getDetailMenuId(id).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.deleteMenu = response.body;
        // if (response == null) {
        //   this._snackBar.openSnackBarWarning(
        //     'Không tìm thấy sản phẩm để xoá!!!'
        //   );
        //   document.getElementById('delete-product-form').click();
        // }
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

  public onDeleteMenu(menu: Menu): void {
    // console.log(product);
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

  // fileName = '';


  // async onFileSelected(event) {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     this.fileName = file.name;

  //     const formData = new FormData();

  //     formData.append('ImgLink', file);

  //     var value = await this.productService.uploadLinkAnh(formData).toPromise();

  //     console.log(value);

  //     this.imgLink = value.body;

  //   }
  // }

  // onRefresh(searchForm: NgForm){
  //   searchForm.resetForm({
  //     name: "",
  //     giaMin: "",
  //     giaMax: ""
  //   });
  //   // console.log(searchForm.value);
  //   this.getProduct();
  // }

  // checkGiaMinMax(searchForm: NgForm): boolean {
  //   var check = true;
  //   console.log(searchForm.value);
  //   if (searchForm.value.giaMin != null &&
  //     searchForm.value.giaMin != 0 &&
  //     searchForm.value.giaMax != null &&
  //     searchForm.value.giaMax != 0
  //   ) {
  //     if (searchForm.value.giaMin > searchForm.value.giaMax)
  //       check = false

  //     console.log(check);
  //   }
  //   return check;
  // }

  // onSubmitSearchApi(searchForm: NgForm) {
  //   if (this.checkGiaMinMax(searchForm)) {
  //     // console.log(searchForm.value);
  //     var searchProduct = {
  //       name: searchForm.value.name,
  //       giaMin: searchForm.value.giaMin,
  //       giaMax: searchForm.value.giaMax
  //     };
  //     if ( searchForm.value.name == null || searchForm.value.name.length == 0 )
  //       searchProduct.name = null;
  //     if (searchForm.value.giaMin == null || searchForm.value.giaMin == 0 )
  //       searchProduct.giaMin = null;
  //     else searchProduct.giaMin = searchForm.value.giaMin * 1000;
  //     if (searchForm.value.giaMax == null || searchForm.value.giaMax == 0 )
  //       searchProduct.giaMax = null;
  //     else searchProduct.giaMax = searchForm.value.giaMax * 1000;
  //     // console.log(searchProduct);
  //     this.productService.searchProduct(searchProduct).subscribe(
  //       (response: Product[]) => {
  //         this.dataSource = new MatTableDataSource<Product>(response);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         this._snackBar.openSnackBarSuccess("Tìm kiếm thành công!");
  //       },
  //       (error: HttpErrorResponse) => {
  //         this._snackBar.openSnackBarDanger("Lỗi hệ thống!!!");
  //         console.log(error.message)
  //       }
  //     )
  //   }
  //   else
  //     this._snackBar.openSnackBarWarning("Khoảng giá tìm kiếm không hợp lệ!");
  // }

  // getImageUrl(publicId: string): string {
  //   const cloudinaryInstance = Cloudinary.new(cloudinaryConfig);
  //   return cloudinaryInstance.url(publicId);
  // }

  // onUploadCloudinary(): void {

  // }

  // uploadImage(event) {
  //   // const cloudinaryInstance = Cloudinary.new(cloudinaryConfig);
  //   // const file = event.target.files[0];
  //   // cloudinaryInstance.

  //   // cloudinaryInstance.upload(file, (error: any, result: any) => {
  //   //   if (error) {
  //   //     console.error('Image upload failed:', error);
  //   //   } else {
  //   //     console.log('Image upload successful:', result);
  //   //   }
  //   // });
  // }
}
