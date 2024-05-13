import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../service/snack-bar.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { FunctionLoginService } from '../service/function-login.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Employee } from '../model/Employee.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public employeeLogin: Employee;
  public userLogin: User = null;

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
          console.log(this.userLogin);
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
}
