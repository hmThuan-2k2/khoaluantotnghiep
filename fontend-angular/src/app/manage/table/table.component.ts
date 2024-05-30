import { ProcessingNewspaperService } from './../../service/processing-newspaper.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ProvisionalInvoice } from 'src/app/model/provisional_invoice.model';
import { Table } from 'src/app/model/table.model';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { ProvisionalInvoiceService } from 'src/app/service/provisional-invoice.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private TableService: TableService,
    private functions_login: FunctionLoginService,
    private ProvisionalInvoiceService: ProvisionalInvoiceService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id','name', 'isEmpty', 'totalInvoice', 'isTemporaryInvoice', 'isProcessingNewspaper', 'action'];
  dataSource  = new MatTableDataSource<Table>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllTable();
  }

  public tableAll: Table[] = null;
  public lengthTableAll: number = null;
  public lengthTableNotEmpty: number = null;
  public tongTotalInvoice: number = null;
  public tableAddDefault = null;
  public editTable: Table = null;
  public tableEditDefault: Table = null;
  public deleteTable: Table = null;
  public provisionalInvoiceAll: ProvisionalInvoice[] = null;

  public getAllTable(): void {
    this.functions_login.getUserProfile();
    this.TableService.getAllTable().subscribe(
      (response: HttpResponse<any>) => {
        this.tableAll = response.body;
        this.lengthTableAll = this.tableAll.length;
        this.lengthTableNotEmpty = 0;
        this.tableAll.forEach((element) => {
          if (element.isEmpty == false) this.lengthTableNotEmpty += 1;
        });
        this.dataSource = new MatTableDataSource<Table>(this.tableAll);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllProvisional_Invoice();
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
        this.provisionalInvoiceAll = response.body;
        // console.log(this.tableAll);
        this.tongTotalInvoice = 0;
        this.provisionalInvoiceAll.forEach((element) => {
          this.tongTotalInvoice += (element.totalMoney - element.totalMoney * element.discount / 100 + element.totalMoney * element.surcharge / 100) ;
        });
        this.dataSource = new MatTableDataSource<Table>(this.tableAll);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  public getTotalInvoice(table: Table): number {
    var value: number = 0;
    this.provisionalInvoiceAll.forEach((element) => {
      if (element.tables.id == table.id)
        value = (element.totalMoney - element.totalMoney * element.discount / 100 + element.totalMoney * element.surcharge / 100);
    })
    return value;
  }

  public onOpenModal(table: Table, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTableModal');
      this.tableAddDefault = {
        name: ""
      }
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateTableModal');
      this.editTable = table;
      this.tableEditDefault = table;
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteTableModal');
      this.deleteTable = table;
    }
    container.appendChild(button);
    button.click();
  }

  public onAddTable(addTableForm: NgForm): void {
    console.log(addTableForm.value);
    var data = {
      // "id": ,
      name: addTableForm.value.name,
      isEmpty: 1,
      isTemporaryInvoice: 0,
      isProcessingNewspaper: 0,
      totalInvoice: 0,
      table_menu: [

      ]
    }
    this.TableService.saveTable(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllTable();
        this._snackBar.openSnackBarSuccess("Thêm bàn mới thành công!");
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
    document.getElementById('add-table-form').click();
    // addForm.resetForm();
  }

  checkIsAddTable(addForm: NgForm): boolean {
    let check = false;
    if (addForm.value != null && this.tableAddDefault != null) {
      if (
        addForm.value?.name != this.tableAddDefault.name &&
        addForm.value?.name != null
      )
        check = true;
    }
    return check;
  }

  setDefaultAddTableForm(addForm: NgForm) {
    addForm.resetForm();
  }

  public onUpdateTable(editForm: NgForm): void {
    // console.log(product);
    let data = {
      id: this.editTable.id,
      name: editForm.value.name,
      isEmpty: this.editTable.isEmpty,
      isTemporaryInvoice: this.editTable.isTemporaryInvoice,
      isProcessingNewspaper: this.editTable.isProcessingNewspaper,
      totalInvoice: this.editTable.totalInvoice,
      table_menu: this.editTable.table_menu
    };
    this.TableService.saveTable(data).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.getAllTable();
        document.getElementById('edit-table-form').click();
        this._snackBar.openSnackBarSuccess("Sửa thông tin bàn thành công!");
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

  checkIsUpdateTable(editForm: NgForm): boolean {
    let check = false;
    if (editForm.value != null && this.tableEditDefault != null) {
      if (editForm.value?.name != this.tableEditDefault?.name)
        check = true;
    }
    return check;
  }

  setDefaultEditTableForm(editForm: NgForm) {
    editForm.resetForm({
      name: this.tableEditDefault.name,
    });
  }

  public onDeleteTable(table: Table): void {
    // console.log(table);
    this.TableService.deleteTable(table.id).subscribe(
      (response: HttpResponse<any>) => {
        // console.log(response);
        this.getAllTable();
        this._snackBar.openSnackBarSuccess(response.body.message);
      },
      (error: HttpErrorResponse) => {
        this._snackBar.openSnackBarDanger('Lỗi hệ thống!!!');
        console.log(error.message);
      }
    );
  }
}
