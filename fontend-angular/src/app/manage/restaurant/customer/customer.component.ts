import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CustomerService } from './../../../service/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TableService } from 'src/app/service/table.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private CustomerService: CustomerService,
    private TableService: TableService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id','name_customer', 'nickname', 'phoneNumber', 'gender', 'address', 'total_invoice', 'action'];
  dataSource  = new MatTableDataSource<Customer>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  public customerAll: Customer[] = null;
  public customerAddDefault = null;
  public editCustomer: Customer = null;
  public customerEditDefault: Customer = null;
  public deleteCustomer: Customer = null;

  public getAllCustomer(): void {
    this.functions_login.getUserProfile();
    this.CustomerService.getAllCustomer().subscribe(
      (response: HttpResponse<any>) => {
        this.customerAll = response.body;
        this.dataSource = new MatTableDataSource<Customer>(this.customerAll);
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

  public onOpenModal(customer: Customer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCustomerModal');
      this.customerAddDefault = {
        name: ""
      }
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateCustomerModal');
      this.editCustomer = customer;
      this.customerEditDefault = customer;
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteCustomerModal');
      this.deleteCustomer = customer;
    }
    container.appendChild(button);
    button.click();
  }

  public onAddCustomer(addCustomerForm: NgForm): void {
    console.log(addCustomerForm.value);
    var data = {
      // "id": ,
      name_customer: addCustomerForm.value.name_customer,
      nickname: addCustomerForm.value.nickname,
      phoneNumber: addCustomerForm.value.phoneNumber,
      gender: addCustomerForm.value.gender,
      address: addCustomerForm.value.address
    }
    this.CustomerService.saveCustomer(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllCustomer();
        this._snackBar.openSnackBarSuccess("Thêm bàn mới thành công!");
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
    document.getElementById('add-customer-form').click();
    // addForm.resetForm();
  }

  checkIsAddCustomer(addForm: NgForm): boolean {
    let check = false;
    if (addForm.value != null && this.customerAddDefault != null) {
      if (
        addForm.value?.name != this.customerAddDefault.name &&
        addForm.value?.name != null
      )
        check = true;
    }
    return check;
  }

  setDefaultAddCustomerForm(addForm: NgForm) {
    addForm.resetForm();
  }

  public onUpdateCustomer(editForm: NgForm): void {
    // console.log(product);
    var data = {
      id: this.editCustomer.id,
      name_customer: editForm.value.name_customer,
      nickname: editForm.value.nickname,
      phoneNumber: editForm.value.phoneNumber,
      gender: editForm.value.gender,
      address: editForm.value.address
    }
    this.CustomerService.saveCustomer(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllCustomer();
        document.getElementById('edit-customer-form').click();
        this._snackBar.openSnackBarSuccess("Sửa thông tin bàn thành công!");
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

  checkIsUpdateCustomer(editForm: NgForm): boolean {
    let check = false;
    if (editForm.value != null && this.customerEditDefault != null) {
      if (editForm.value?.name != this.customerEditDefault?.name_customer)
        check = true;
      if (editForm.value?.nickname != this.customerEditDefault?.nickname)
        check = true;
      if (editForm.value?.phoneNumber != this.customerEditDefault?.phoneNumber)
        check = true;
      if (editForm.value?.gender != this.customerEditDefault?.gender)
        check = true;
      if (editForm.value?.address != this.customerEditDefault?.address)
        check = true;
    }
    return check;
  }

  setDefaultEditCustomerForm(editForm: NgForm) {
    editForm.resetForm({
      name_customer: this.customerEditDefault.name_customer,
      nickname: this.customerEditDefault.nickname,
      phoneNumber: this.customerEditDefault.phoneNumber,
      gender: this.customerEditDefault.gender,
      address: this.customerEditDefault.address
    });
  }

  public onDeleteCustomer(customer: Customer): void {
    // console.log(Customer);
    // this.CustomerService.deleteCustomer(customer.id).subscribe(
    //   (response: HttpResponse<any>) => {
    //     // console.log(response);
    //     this.getAllCustomer();
    //     this._snackBar.openSnackBarSuccess(response.body.message);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
    //     console.log(error.message);
    //   }
    // );
  }
}
