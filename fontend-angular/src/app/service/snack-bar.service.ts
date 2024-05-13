import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  public openSnackBarSuccess(message: string) {
    this._snackBar.open(message,
      'Đóng',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['bg-success', 'text-white', 'success-snackbar']
      }
    );
  }

  public openSnackBarWarning(message: string) {
    this._snackBar.open(message,
      'Đóng',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['bg-warning', 'text-dark', 'warning-snackbar']
      }
    );
  }

  public openSnackBarDanger(message: string) {
    this._snackBar.open(message,
      'Đóng',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['bg-danger', 'text-white', 'danger-snackbar']
      }
    );
  }
}
