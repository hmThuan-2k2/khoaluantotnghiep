import { ProcessingNewspaperService } from './../../service/processing-newspaper.service';
import { ProcessingNewspaper } from './../../model/processing_newspaper.model';
import { InvoiceService } from './../../service/invoice.service';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../service/snack-bar.service';
import { Router } from '@angular/router';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { TableService } from 'src/app/service/table.service';
import { ProvisionalInvoiceService } from 'src/app/service/provisional-invoice.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Invoice } from 'src/app/model/invoice.model';
import { Menu_Selling } from 'src/app/model/menu_selling.model';

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
    private InvoiceService: InvoiceService,
    private ProcessingNewspaperService: ProcessingNewspaperService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  public lengthTableAll: number = null;
  public lengthTableNotEmpty: number = null;
  public tongTotalProvisional_Invoice: number = null;

  public dateTimeNowString: string = null;

  public dateFilter = new Date();
  public maxDate = new Date();
  public minDate = new Date(this.dateFilter.getFullYear() - 5, 0, 1);
  public dateString: string;

  public dataInvoice: Invoice[] = null;
  public lengthInvoice: number = null;
  public tongTotalInvoice: number = null;

  public dataProcessingNewspaper: ProcessingNewspaper[] = null;

  public dataMenuSelling: Menu_Selling[] = null;

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    // console.log(event.value);
    var date = new Date(event.value);
    this.dateString = this.getStringDate(date);
    console.log(this.dateString);
    this.getAllInvoiceDate();
    this.getAllProcessingNewspaperDate();
  }

  public getStringDate(date: Date): string {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var dateChange: string;
    if (day < 10)
      dateChange = "0" + day + "/";
    else dateChange = day + "/"
    if (month < 10)
      dateChange += "0" + month + "/";
    else dateChange += month + "/"
    dateChange += year;
    return dateChange;
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

  ngOnInit(): void {
    document.getElementById('home').classList.add('active');
    this.dateString = this.getStringDate(new Date());
    // this.dateFilter = new Date();
    this.setDateTimeNow();
    setInterval(() => {
      this.setDateTimeNow();
    }, 1000)
    this.getAllInvoiceDate();
    this.getAllProcessingNewspaperDate();
    this.getAllTable();
    this.getAllProvisional_Invoice();
  }

  public checkDataMenuSelling(ProcessingNewspaper: ProcessingNewspaper) : boolean {
    var check: boolean = false;
    this.dataMenuSelling?.forEach(element => {
      if (element.id == ProcessingNewspaper.menu.id)
        check = true;
    });
    return check;
  }

  public getAllProcessingNewspaperDate(): void {
    var data = {
      date: this.dateString
    }
    this.ProcessingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(data).subscribe(
      (response: HttpResponse<any>) => {
        this.dataProcessingNewspaper = response.body;
        console.log(this.dataProcessingNewspaper);
        this.dataMenuSelling = [];
        this.dataProcessingNewspaper.forEach(element => {
          if (this.checkDataMenuSelling(element)) {
            this.dataMenuSelling?.forEach(element1 => {
              if (element1.id == element.menu.id) {
                element1.sell_number += element.amount_cooking;
              }
            });
          }
          else {
            var menu_selling: Menu_Selling = new Menu_Selling(element.menu.id, element.menu.name_menu, element.amount_cooking);
            this.dataMenuSelling.push(menu_selling);
          }
        });
        this.dataMenuSelling.sort(
          (a, b) => b.sell_number - a.sell_number
        )
        console.log(this.dataMenuSelling);
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
    )
  }

  public getAllInvoiceDate(): void {
    var data = {
      date: this.dateString
    }
    this.InvoiceService.getAllInvoiceDateCreate(data).subscribe(
      (response: HttpResponse<any>) => {
        this.dataInvoice = response.body;
        this.lengthInvoice = this.dataInvoice.length;
        this.tongTotalInvoice = 0;
        this.dataInvoice.forEach(element => {
          this.tongTotalInvoice += element.totalMoney;
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
    )
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
        this.tongTotalProvisional_Invoice = 0;
        response.body.forEach((element) => {
          this.tongTotalProvisional_Invoice += (element.totalMoney - element.totalMoney * element.discount / 100 + element.totalMoney * element.surcharge / 100) ;
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
