import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../service/snack-bar.service';
import { Router } from '@angular/router';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { TableService } from 'src/app/service/table.service';
import { ProvisionalInvoiceService } from 'src/app/service/provisional-invoice.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private TableService: TableService,
    private functions_login: FunctionLoginService,
    private ProvisionalInvoiceService: ProvisionalInvoiceService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  public lengthTableAll: number = null;
  public lengthTableNotEmpty: number = null;
  public tongTotalInvoice: number = null;

  public dateTimeNowString: string = null;

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

  public dataInvoice = [
    {
      a: "1",
      b: "18:23, 25/05/2024",
      c: "835000",
      d: "A Thuận"
    },
    {
      a: "2",
      b: "18:29, 25/05/2024",
      c: "230000",
      d: "Khách Lẻ"
    },
    {
      a: "3",
      b: "19:12, 25/05/2024",
      c: "129000",
      d: "A Tài (FPT)"
    },
    {
      a: "4",
      b: "19:13, 25/05/2024",
      c: "323000",
      d: "Khách Lẻ"
    },
    {
      a: "5",
      b: "19:14, 25/05/2024",
      c: "102000",
      d: "Khách Lẻ"
    },
    {
      a: "6",
      b: "19:14, 25/05/2024",
      c: "94000",
      d: "Khách Lẻ"
    },

  ]

  public dataMenu = [
    {
      a: 1,
      b: "HUDA LON",
      c: "30"
    },
    {
      a: 2,
      b: "HUDA Trâu",
      c: "25"
    },
    {
      a: 3,
      b: "Nem-Chả-Tré Bóp",
      c: "6"
    },
    {
      a: 4,
      b: "Nem-Chả-Tré",
      c: "3"
    },
    {
      a: 5,
      b: "Ngựa",
      c: "2"
    },
    {
      a: 6,
      b: "Sài Gòn",
      c: "2"
    },
    {
      a: 7,
      b: "7 up",
      c: "1"
    },
    {
      a: 8,
      b: "Nước suối",
      c: "1"
    },
  ]

  ngOnInit(): void {
    document.getElementById('home').classList.add('active');
    this.setDateTimeNow();
    setInterval(() => {
      this.setDateTimeNow();
    }, 1000)
    this.getAllTable();
    this.getAllProvisional_Invoice();
  }

  public getAllTable(): void {
    this.functions_login.getUserProfile();
    this.TableService.getAllTable().subscribe(
      (response: HttpResponse<any>) => {
        this.lengthTableAll = response.body.length;
        this.lengthTableNotEmpty = 0;
        response.body.forEach((element) => {
          if (element.isEmpty == false) this.lengthTableNotEmpty += 1;
        });
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

  public getAllProvisional_Invoice(): void {
    this.functions_login.getUserProfile();
    this.ProvisionalInvoiceService.getAllProvisionalInvoice().subscribe(
      (response: HttpResponse<any>) => {
        // console.log(this.tableAll);
        this.tongTotalInvoice = 0;
        response.body.forEach((element) => {
          this.tongTotalInvoice += (element.totalMoney - element.totalMoney * element.discount / 100 + element.totalMoney * element.surcharge / 100) ;
        });
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
