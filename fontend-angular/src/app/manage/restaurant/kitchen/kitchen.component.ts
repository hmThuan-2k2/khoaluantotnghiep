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
  public dataDateTime: string[] = [];
  public dataRow1: ProcessingNewspaper[] = null;
  public dataRow2: ProcessingNewspaper[] = null;
  public dataRow3: ProcessingNewspaper[] = null;
  public selectDate: string = null;

  public dateTimeNowString: string = null;

  ngOnInit(): void {
    this.setDateTimeNow();
    setInterval(() => {
      this.setDateTimeNow();
    }, 1000)
    setInterval(() => {
      this.getDataRow1();
      this.getDataRow2();
      this.getDataRow3();
      console.log("Load Data!!!")
    }, 5000)
    this.getDateNow();
    this.getDataRow1();
    this.getDataRow2();
    this.getDataRow3();
  }

  public onConfirm(processingNewspaper: ProcessingNewspaper): void {
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.confirmProcessingNewspaper(processingNewspaper.id).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this._snackBar.openSnackBarSuccess(response.body.message);
        this.getDataRow1();
        this.getDataRow2();
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

  public onCooking(processingNewspaper: ProcessingNewspaper): void {
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.cookingProcessingNewspaper(processingNewspaper.id).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this._snackBar.openSnackBarSuccess(response.body.message);
        this.getDataRow2();
        this.getDataRow3();
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

  public onCancel(processingNewspaper: ProcessingNewspaper): void {
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.cancelProcessingNewspaper(processingNewspaper.id).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this._snackBar.openSnackBarSuccess(response.body.message);
        this.getDataRow1();
        this.getDataRow2();
        this.getDataRow3();
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

  public setDateTimeNow(): void {
    var dateNow: Date = new Date();
    var hours = dateNow.getHours();
    var minus = dateNow.getMinutes();
    var seconds = dateNow.getSeconds();
    var day = dateNow.getDate();
    var month = dateNow.getMonth() + 1;
    var year = dateNow.getFullYear();
    var textDateTime: string;
    if (hours < 10)
      textDateTime = "0" + hours + ":";
    else textDateTime = hours + ":";
    if (minus < 10)
      textDateTime += "0" + minus + ":";
    else textDateTime += minus + ":";
    if (seconds < 10)
      textDateTime += "0" + seconds + ", ";
    else textDateTime += seconds + ", ";
    if (day < 10)
      textDateTime += "0" + day + "/";
    else textDateTime += day + "/";
    if (month < 10)
      textDateTime += "0" + month + "/"
    else textDateTime += month + "/"
    textDateTime += year;
    // console.log(textDateTime);
    this.dateTimeNowString = textDateTime;
  }

  public onChangeSelectDate(newValue: string) {
    console.log(newValue);
    this.selectDate = newValue;
  }

  public getDataRow1(): void {
    var data = {
      date: this.dateNow
    }
    this.functions_login.getUserProfile();
    this.ProcessingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmIsNot(data).subscribe(
      (response: HttpResponse<any>) => {
        // console.log(response);
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
        // console.log(response);
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
        // console.log(response);
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
    var day = today.getDate();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // this.dateNow = "27/05/2024";
    this.dateNow = date;

    for (let index = 0; index < 7; index++) {
      this.dataDateTime.push( (day - index - 1) + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() );
    }

    console.log(this.dataDateTime);
  }


}
