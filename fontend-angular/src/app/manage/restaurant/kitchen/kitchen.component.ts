import { PrintProvisionalInvoiceComponent } from './../cashier/print/print-provisional-invoice/print-provisional-invoice.component';
import { TableService } from 'src/app/service/table.service';
import { ProcessingNewspaperService } from './../../../service/processing-newspaper.service';
import { Component, OnInit } from '@angular/core';
import { MenuGroupService } from 'src/app/service/menu-group.service';
import { MenuService } from 'src/app/service/menu.service';
import { ProvisionalInvoiceService } from 'src/app/service/provisional-invoice.service';
import { TableMenuService } from 'src/app/service/table-menu.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PrintService } from 'src/app/service/print.service';
import { LoginService } from 'src/app/service/login.service';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { Router } from '@angular/router';
import { ProcessingNewspaper } from 'src/app/model/processing_newspaper.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent implements OnInit {
  constructor(
    private ProcessingNewspaperService: ProcessingNewspaperService,
    private TableService: TableService,
    private MenuGroupService: MenuGroupService,
    private MenuService: MenuService,
    private ProvisionalInvoiceService: ProvisionalInvoiceService,
    private TableMenuService: TableMenuService,
    private CustomerService: CustomerService,
    private printService: PrintService,
    private loginService: LoginService,
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) {}

  public dateNow: string = null;
  public dateTimeNow: string = null;
  public dataRow1: ProcessingNewspaper[] = null;
  public dataRow2: ProcessingNewspaper[] = null;
  public dataRow3: ProcessingNewspaper[] = null;

  ngOnInit(): void {
    this.getDateNow();
    this.getDateTimeNow();
    this.getDataRow1();
    this.getDataRow2();
    this.getDataRow3();
  }

  public getDateTimeNow(): void {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var date: string;
    var time: string;
    if (day <= 9)
      date = "0" + day + "/";
    else date = day + "/";

    if (month <= 9)
      date = date + "0" + month + "/";
    else date = date + month + "/";

    date = date + year;

    if (hours <= 9)
      time = "0" + hours + ":";
    else time = hours + ":";

    if (minutes <= 9)
      time = time + "0" + minutes + ":";
    else time = time + minutes + ":";

    if (seconds <= 9)
      time = time + "0" + seconds;
    else time = time + seconds;

    this.dateTimeNow = time + ", " + date;
    console.log(this.dateTimeNow);
    // setTimeout(this.getDateTimeNow(), 1000);
  }

  public getDataRow1(): void {
    var data = {
      date: this.dateNow
    }
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmIsNot(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.dataRow1 = response.body;
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

  public getDataRow2(): void {
    var data = {
      date: this.dateNow
    }
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmAndNotCooking(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.dataRow2 = response.body;
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

  public getDataRow3(): void {
    var data = {
      date: this.dateNow
    }
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.dataRow3 = response.body;
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

  public getDateNow(): void {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.dateNow = "23/05/2024";
  }


}
