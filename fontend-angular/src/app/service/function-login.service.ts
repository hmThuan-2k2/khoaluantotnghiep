import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { SnackBarService } from './snack-bar.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionLoginService {

  constructor(
    private loginService: LoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }



  public refreshToken(): void {
    let token = localStorage.getItem('token');
    this.loginService.refreshToken(token).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        let accessToken = response.body.accessToken;
        let token = response.body.token;
        console.log(accessToken);
        console.log(token);
        if (localStorage.getItem('token') != null ){
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', token);
        if (sessionStorage.getItem('accessToken') != null ){
          sessionStorage.removeItem('accessToken');
        }
        sessionStorage.setItem('accessToken', accessToken);
        this._snackBar.openSnackBarSuccess("Đã cấp token thành công! Vui lòng thực hiện lại!");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403){
          this._snackBar.openSnackBarWarning("Token đã quá hạn để gia hạn thêm! Vui lòng đăng nhập lại!")
          this.router.navigate(['/login']);
        }
      }
    );
  }

  public logout(): void {
    let token = localStorage.getItem('token');
    this.loginService.logout(token).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this._snackBar.openSnackBarSuccess("Đăng xuất thành công!");
        localStorage.removeItem('token');
        sessionStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning("Đăng xuất lỗi 403!");
        }
      }
    );
  }

  public getUserProfile(): void {
    let accessToken = sessionStorage.getItem('accessToken');
    this.loginService.getUserProfile(accessToken).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning("Token đã hết hạn! Chờ cấp token mới!");
          this.refreshToken();
        }
      }
    );
  }
}
