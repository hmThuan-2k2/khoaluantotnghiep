import { Employee } from './../model/employee.model';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../service/snack-bar.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { FunctionLoginService } from '../service/function-login.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../model/user.model';
import { style } from '@angular/animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public employeeLogin: Employee;
  public userLogin: User = null;
  public roles: Array<String> = [];
  public isHiddenPass = true;

  constructor(
    private loginService: LoginService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployeeLogin();
  }

  public getEmployeeLogin(): void {
    if (sessionStorage.getItem('accessToken') != null ){
      const accessToken = sessionStorage.getItem('accessToken');
      this.loginService.getUserProfile(accessToken).subscribe(
        (response: HttpResponse<any>) => {
          // console.log(response);
          this.userLogin = response.body;
          this.employeeLogin = response.body.employee;
          console.log(this.userLogin);
          this.userLogin.roles.forEach(element => {
            this.roles.push(element.name);
          });
          console.log(this.roles);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning('Token đã hết hạn! Chờ cấp token mới!');
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  goToRouterManageHome(): void {
    this.router.navigate(['/manage', 'home']);
    document.getElementById('restaurant').classList.remove('active');
    document.getElementById('table').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('customer').classList.remove('active');
    document.getElementById('employee').classList.remove('active');
    document.getElementById('home').classList.add('active');
  }

  goToRouterManageRestaurantCashier(): void {
    this.router.navigate(['/manage', 'restaurant', 'cashier']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('table').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('customer').classList.remove('active');
    document.getElementById('employee').classList.remove('active');
    document.getElementById('restaurant').classList.add('active');
  }

  goToRouterManageRestaurantKitchen(): void {
    this.router.navigate(['/manage', 'restaurant', 'kitchen']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('table').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('customer').classList.remove('active');
    document.getElementById('employee').classList.remove('active');
    document.getElementById('restaurant').classList.add('active');
  }

  goToRouterManageTable(): void {
    this.router.navigate(['/manage', 'table']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('restaurant').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('customer').classList.remove('active');
    document.getElementById('employee').classList.remove('active');
    document.getElementById('table').classList.add('active');
  }


  goToRouterManageMenu(): void {
    this.router.navigate(['/manage', 'menu']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('restaurant').classList.remove('active');
    document.getElementById('table').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('customer').classList.remove('active');
    document.getElementById('employee').classList.remove('active');
    document.getElementById('menu').classList.add('active');
  }

  goToRouterManageCustomer(): void {
    this.router.navigate(['/manage', 'customer']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('restaurant').classList.remove('active');
    document.getElementById('table').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('employee').classList.remove('active');
    document.getElementById('customer').classList.add('active');
  }

  goToRouterManageEmployee(): void {
    this.router.navigate(['/manage', 'employee']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('restaurant').classList.remove('active');
    document.getElementById('table').classList.remove('active');
    document.getElementById('menu').classList.remove('active');
    document.getElementById('customer').classList.remove('active');
    document.getElementById('employee').classList.add('active');
  }

  goToRouterLogin(): void {
    this.functions_login.logout();
    // var routers = "/login";
    // sessionStorage.clear();
    // sessionStorage.removeItem('accessToken');
    // localStorage.clear();
    // localStorage.removeItem('token');
    // this.router.navigate(['/login']);
    // return routers;
  }

  public setIsHiddenPass(){
    this.isHiddenPass = !this.isHiddenPass;
    if (this.isHiddenPass){
      document.getElementById('button-hiden-old').innerHTML = '<i class="fa fa-eye-slash" style="font-size: 20px"></i>';
      document.getElementById('button-hiden-new').innerHTML = '<i class="fa fa-eye-slash" style="font-size: 20px"></i>';
    }
    else {
      document.getElementById('button-hiden-old').innerHTML = '<i class="fa fa-eye" style="font-size: 20px"></i>';
      document.getElementById('button-hiden-new').innerHTML = '<i class="fa fa-eye" style="font-size: 20px"></i>';
    }

    // this.functions_login.logout();
  }

  public getTypePass(): string{
    if (this.isHiddenPass) {
      return 'password';
    }
    else { return 'text'; }
  }

  public onOpenModal(): void {
    const container = document.getElementById('main-container-home');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#thongTinTaiKhoanModal');
    container.appendChild(button);
    button.click();
  }

  public onChangePassword(form: NgForm): void {
    console.log(form.value);
    const data = {
      id : form.value.id,
      username: form.value.username,
      passwordOld: form.value.passwordOld,
      passwordNew: form.value.passwordNew
    };
    if (sessionStorage.getItem('accessToken') != null ){
      const accessToken = sessionStorage.getItem('accessToken');
      this.loginService.changePasswordUser(accessToken, data).subscribe(
        (response: HttpResponse<any>) => {
          const value = response.body;
          if (value.trangThai == 1) {
            this._snackBar.openSnackBarSuccess(value.message);
          }
          else if (value.trangThai == 2) {
            this._snackBar.openSnackBarWarning(value.message);
 }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 403) {
            this._snackBar.openSnackBarWarning('Token đã hết hạn! Chờ cấp token mới!');
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }
}
