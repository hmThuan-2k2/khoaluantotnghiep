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

@Component({
  selector: 'app-print-provisional-invoice',
  templateUrl: './print-provisional-invoice.component.html',
  styleUrls: ['./print-provisional-invoice.component.css']
})
export class PrintProvisionalInvoiceComponent implements OnInit {

  public provisionalInvoiceIds: string[];
  public provisionalInvoiceDetails: Promise<any>[];
  public data: TableMenu[] = null;
  public dataMenu: Menu[] = null;
  // public user: User = null;
  public provisionalInvoice: ProvisionalInvoice;

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
    this.provisionalInvoiceIds = route.snapshot.params['provisionalInvoiceIds'].split(',');
  }

  ngOnInit() {
    this.provisionalInvoiceDetails = this.provisionalInvoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.provisionalInvoiceDetails)
      .then(() => this.printService.onDataReady());
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    this.getHoaDon(invoiceId);
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }


  getHoaDon(id): void {
    const dataId = {
      id: id,
    };
    this.ProvisionalInvoiceService.getProvisionalInvoiceId(dataId).subscribe(
      (response: HttpResponse<any>) => {
        this.provisionalInvoice = response.body;
        // console.log(provisionalInvoice);
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

  // getAllChiTietHoaDon(id): void {
  //   this.hoadonService.getAllChiTietHoaDonId(id).subscribe(
  //     (response: ChiTietHoaDon[]) => {
  //       console.log(response);
  //       this.data = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       this._snackBar.openSnackBarDanger("Lỗi hệ thống!!!");
  //       console.log(error.message)
  //     }
  //   );
  // }

  // getUser(id): void {
  //   this.userService.getUserId(id).subscribe(
  //     (response: User) => {
  //       this.user = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       this._snackBar.openSnackBarDanger("Lỗi hệ thống!!!");
  //       console.log(error.message)
  //     }
  //   );
  // }

  // getSanPham(): void {
  //   this.productService.getProduct().subscribe(
  //     (response: Product[]) => {
  //       this.dataProduct = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       this._snackBar.openSnackBarDanger("Lỗi hệ thống!!!");
  //       console.log(error.message)
  //     }
  //   );
  // }

  // getSanPhamId(id: number): Product {
  //   for (let index = 0; index < this.dataProduct?.length; index++) {
  //     const element = this.dataProduct[index];
  //     if (id == element.id) return element;
  //   }
  //   return null;
  // }

}
