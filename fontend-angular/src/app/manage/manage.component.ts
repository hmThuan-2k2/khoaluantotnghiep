import { Employee } from './../model/employee.model';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../service/snack-bar.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { FunctionLoginService } from '../service/function-login.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../model/user.model';
import { style } from '@angular/animations';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public employeeLogin: Employee;
  public userLogin: User = null;
  public roles: Array<String> = [];

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
      let accessToken = sessionStorage.getItem('accessToken');
      this.loginService.getUserProfile(accessToken).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
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
            this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
            this.functions_login.refreshToken();
          }
        }
      );
    }
  }

  goToRouterManageHome(): void {
    this.router.navigate(['/manage', 'home']);
    document.getElementById('home').classList.add('active');
    document.getElementById('restaurant').classList.remove('active');
  }

  goToRouterManageRestaurantCashier(): void {
    this.router.navigate(['/manage', 'restaurant', 'cashier']);
    document.getElementById('home').classList.remove('active');
    document.getElementById('restaurant').classList.add('active');
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
}
