
import { LoginService } from 'src/app/service/login.service';

import { EmployeeService } from './../../service/employee.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
import { CustomerService } from 'src/app/service/customer.service';
import { Employee } from 'src/app/model/employee.model';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private EmployeeService: EmployeeService,
    private TableService: TableService,
    private functions_login: FunctionLoginService,
    private LoginService: LoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id','name', 'phoneNumber', 'gender', 'dateOfBirth', 'note', 'action', 'user'];
  dataSource  = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  public dataEmployeeAll: Employee[] = null;
  public employeeAddDefault = null;
  public editEmployee: Employee = null;
  public employeeEditDefault: Employee = null;
  public deleteEmployee: Employee = null;

  public dataUserAll: User[] = null;

  public checkUser(Employee: Employee): boolean {
    var check = false;
    this.dataUserAll.forEach(element => {
      if (element.employee != null) {
        if (element.employee.id == Employee.id)
          check = true;
      }
    });
    return check;
  }

  public getAllUser(): void {
    this.functions_login.getUserProfile();
    if (sessionStorage.getItem('accessToken') != null ){
      let accessToken = sessionStorage.getItem('accessToken');
      this.LoginService.getAllUser(accessToken).subscribe(
        (response: HttpResponse<any>) => {
          this.dataUserAll = response.body;
          console.log(this.dataUserAll);
          this.getAllEmployee();
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

  public getAllEmployee(): void {
    this.functions_login.getUserProfile();
    this.EmployeeService.getAllEmployee().subscribe(
      (response: HttpResponse<any>) => {
        this.dataEmployeeAll = response.body;
        this.dataSource = new MatTableDataSource<Employee>(this.dataEmployeeAll);
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

  public onOpenModal(Employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
      // this.employeeAddDefault = {
      //   name: ""
      // }
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
      this.editEmployee = Employee;
      this.employeeEditDefault = Employee;
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
      this.deleteEmployee = Employee;
    }
    container.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    console.log(addForm.value);
    // var data = {
    //   // "id": ,
    //   name_customer: addCustomerForm.value.name_customer,
    //   nickname: addCustomerForm.value.nickname,
    //   phoneNumber: addCustomerForm.value.phoneNumber,
    //   gender: addCustomerForm.value.gender,
    //   address: addCustomerForm.value.address
    // }
    this.EmployeeService.saveEmployee(addForm.value).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllEmployee();
        this._snackBar.openSnackBarSuccess("Thêm nhân viên mới thành công!");
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
    document.getElementById('add-employee-form').click();
    // addForm.resetForm();
  }

  checkIsAddEmployee(addForm: NgForm): boolean {
    let check = false;
    if (addForm.value != null && this.employeeAddDefault != null) {
      if (
        addForm.value?.name != this.employeeAddDefault.name &&
        addForm.value?.name != null
      )
        check = true;
    }
    return check;
  }

  setDefaultAddEmployeeForm(addForm: NgForm) {
    addForm.resetForm();
  }

  public onUpdateEmployee(editForm: NgForm): void {
    console.log(editForm.value);
    // var data = {
    //   id: this.editCustomer.id,
    //   name_customer: editForm.value.name_customer,
    //   nickname: editForm.value.nickname,
    //   phoneNumber: editForm.value.phoneNumber,
    //   gender: editForm.value.gender,
    //   address: editForm.value.address
    // }
    this.EmployeeService.saveEmployee(editForm.value).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllEmployee();
        document.getElementById('edit-employee-form').click();
        this._snackBar.openSnackBarSuccess("Sửa thông tin nhân viên thành công!");
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

  checkIsUpdateEmployee(editForm: NgForm): boolean {
    let check = false;
    if (editForm.value != null && this.employeeEditDefault != null) {
      // if (editForm.value?.name != this.employeeEditDefault?.name_customer)
      //   check = true;
      // if (editForm.value?.nickname != this.employeeEditDefault?.nickname)
      //   check = true;
      // if (editForm.value?.phoneNumber != this.employeeEditDefault?.phoneNumber)
      //   check = true;
      // if (editForm.value?.gender != this.employeeEditDefault?.gender)
      //   check = true;
      // if (editForm.value?.address != this.employeeEditDefault?.address)
      //   check = true;
    }
    return check;
  }

  setDefaultEditEmployeeForm(editForm: NgForm) {
    // editForm.resetForm({
    //   name_customer: this.employeeEditDefault.name_customer,
    //   nickname: this.employeeEditDefault.nickname,
    //   phoneNumber: this.employeeEditDefault.phoneNumber,
    //   gender: this.employeeEditDefault.gender,
    //   address: this.employeeEditDefault.address
    // });
  }

  public onDeleteEmployee(Employee: Employee): void {
    console.log(Employee);
    this.EmployeeService.deleteEmployee(Employee.id).subscribe(
      (response: HttpResponse<any>) => {
        // console.log(response);
        this.getAllEmployee();
        this._snackBar.openSnackBarSuccess(response.body.message);
      },
      (error: HttpErrorResponse) => {
        this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
        console.log(error.message);
      }
    );
  }

  public dataRoles = [
    {
      id: 1,
      name: "ADMIN"
    },
    {
      id: 2,
      name: "CASHIER"
    },
    {
      id: 3,
      name: "CHEF"
    }
  ]

}
