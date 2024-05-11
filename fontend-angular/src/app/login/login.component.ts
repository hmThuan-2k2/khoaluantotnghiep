import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isHiddenPass: boolean = true;
  public isGhiNho: boolean = true;
  public username: string;
  public password: string;

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') != null) {
      this.username = localStorage.getItem('username');
    }
    else this.username = 'admin';
    if (localStorage.getItem('password') != null) {
      this.password = localStorage.getItem('password');
    }
    else this.password = '123456';
  }

  public onLogin(loginForm: NgForm): void {
    console.log(loginForm.value);
    // let dataLogin = loginForm.value;
    // console.log(dataLogin.username);
    // console.log(dataLogin.password);
    console.log(this.username);
    console.log(this.password);
    let dataLogin1 = {
      username: this.username,
      password: this.password
    }
    console.log(dataLogin1);
    this.loginService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        let accessToken = response.accessToken;
        let token = response.token;
        console.log(accessToken);
        console.log(token);
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
        if (error.status == 403) {
          this.openSnackBar("Đăng nhập không thành công!!!");
        }
        else console.log(error.message);
      }
    );
  }

  public setIsHiddenPass(){
    this.isHiddenPass = !this.isHiddenPass;
    if (this.isHiddenPass)
      document.getElementById('button-hiden').innerHTML = '<i class="fa fa-eye-slash" style="font-size: 20px"></i>';
    else
      document.getElementById('button-hiden').innerHTML = '<i class="fa fa-eye" style="font-size: 20px"></i>';
  }

  public getTypePass(): string{
    if (this.isHiddenPass)
      return 'password';
    else return 'text';
  }
}
