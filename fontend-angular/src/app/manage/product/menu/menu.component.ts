import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Table } from 'src/app/model/table.model';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private TableService: TableService,
    private functions_login: FunctionLoginService,
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

  public getAllTable(): void {
    this.functions_login.getUserProfile();
    this.TableService.getAllTable().subscribe(
      (response: HttpResponse<any>) => {
        this.tableAll = response.body;
        this.lengthTableAll = this.tableAll.length;
        // console.log(this.tableAll);
        this.lengthTableNotEmpty = 0;
        this.tongTotalInvoice = 0;
        this.tableAll.forEach((element) => {
          if (element.isEmpty == false) this.lengthTableNotEmpty += 1;
          this.tongTotalInvoice += element.totalInvoice;
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
}
