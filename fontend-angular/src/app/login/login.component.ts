import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarService } from '../service/snack-bar.service';
import { FunctionLoginService } from '../service/function-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isHiddenPass: boolean = true;
  public isGhiNho: boolean = false;
  public username: string = null;
  public password: string = null;

  constructor(
    private loginService: LoginService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // if (localStorage.getItem('username') != null) {
    //   this.username = localStorage.getItem('username');
    // }
    // else this.username = null;
    // if (localStorage.getItem('password') != null) {
    //   this.password = localStorage.getItem('password');
    // }
    // else this.password = null;
  }

  public onLogin(loginForm: NgForm): void {
    // console.log(loginForm.value);
    // let dataLogin = loginForm.value;
    // console.log(dataLogin.username);
    // console.log(dataLogin.password);
    // console.log(this.username);
    // console.log(this.password);
    let dataLogin1 = {
      username: this.username,
      password: this.password
    }
    console.log(dataLogin1);
    this.loginService.login(loginForm.value).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        if (response.status == 200) {
          this._snackBar.openSnackBarSuccess("Đăng nhập thành công!")
        }
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
        // if (this.isGhiNho) {
        //   if (localStorage.getItem('account') != null) {
        //     localStorage.removeItem('account');
        //   }
        //   localStorage.setItem('account', this.username);
        //   if (localStorage.getItem('password') != null) {
        //     localStorage.removeItem('password');
        //   }
        //   localStorage.setItem('password', this.password);
        // }
        this.router.navigate(['/manage']);
        // this.userLogin = response;
        // if (this.userLogin.idUser != null){
        //   this.openSnackBar("Đăng nhập thành công.");
        //   console.log("Đăng nhập thành công.");
        //   sessionStorage.setItem('idUser', this.userLogin.idUser.toString());
        //   if (this.isGhiNho) {
        //     if (localStorage.getItem('account') != null) {
        //       localStorage.removeItem('account');
        //     }
        //     localStorage.setItem('account', this.userLogin.accountUser);
        //     if (localStorage.getItem('password') != null) {
        //       localStorage.removeItem('password');
        //     }
        //     localStorage.setItem('password', this.userLogin.passwordUser);
        //   }
        //   this.router.navigate(['/home']);
        // }
        // else {
        //   this.openSnackBar(response.toString());
        //   console.log(response.toString());
        // }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 403) {
          this._snackBar.openSnackBarWarning("Đăng nhập không thành công!!!");
        }
      }
    );
  }

  public setIsHiddenPass(){
    this.isHiddenPass = !this.isHiddenPass;
    if (this.isHiddenPass)
      document.getElementById('button-hiden').innerHTML = '<i class="fa fa-eye-slash" style="font-size: 20px"></i>';
    else
      document.getElementById('button-hiden').innerHTML = '<i class="fa fa-eye" style="font-size: 20px"></i>';

    // this.functions_login.logout();
  }

  public getTypePass(): string{
    if (this.isHiddenPass)
      return 'password';
    else return 'text';
  }
}
