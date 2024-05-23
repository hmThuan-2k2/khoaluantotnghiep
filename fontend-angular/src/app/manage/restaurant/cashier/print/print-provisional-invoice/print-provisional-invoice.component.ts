import { Customer } from './../../../../../model/customer.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ProvisionalInvoiceService } from './../../../../../service/provisional-invoice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/model/menu.model';
import { ProvisionalInvoice } from 'src/app/model/provisional_invoice.model';
import { TableMenu } from 'src/app/model/tablemenu.model';
import { PrintService } from 'src/app/service/print.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TableService } from 'src/app/service/table.service';
import { MenuGroupService } from 'src/app/service/menu-group.service';
import { MenuService } from 'src/app/service/menu.service';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { LoginService } from 'src/app/service/login.service';
import { Table } from 'src/app/model/table.model';

@Component({
  selector: 'app-print-provisional-invoice',
  templateUrl: './print-provisional-invoice.component.html',
  styleUrls: ['./print-provisional-invoice.component.css']
})
export class PrintProvisionalInvoiceComponent implements OnInit {

  public provisionalInvoiceIds: string[];
  public provisionalInvoiceDetails: Promise<any>[];
  public provisionalInvoice: ProvisionalInvoice = null;
  public customer: Customer = null;
  public table: Table = null;
  public data: TableMenu[] = null;

  constructor(
    private TableService: TableService,
    private MenuGroupService: MenuGroupService,
    private MenuService: MenuService,
    private ProvisionalInvoiceService: ProvisionalInvoiceService,
    private _snackBar: SnackBarService,
    private printService: PrintService,
    private loginService: LoginService,
    private functions_login: FunctionLoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.provisionalInvoiceIds = route.snapshot.params['provisionalinvoiceIds'].split(',');
  }

  ngOnInit() {
    this.provisionalInvoiceDetails = this.provisionalInvoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.provisionalInvoiceDetails)
      .then(() => this.printService.onDataReady());
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    this.getProvisionalInvoice(invoiceId);
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }


  getProvisionalInvoice(id): void {
    const dataId = {
      id: id,
    };
    this.ProvisionalInvoiceService.printProvisionalInvoiceId(dataId).subscribe(
      (response: HttpResponse<any>) => {
        this.provisionalInvoice = response.body;
        this.customer = this.provisionalInvoice?.customer;
        this.table = this.provisionalInvoice?.tables;
        this.data = this.table?.table_menu;
        console.log(this.provisionalInvoice);
        console.log(this.customer);
        console.log(this.table);
        console.log(this.data);
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
