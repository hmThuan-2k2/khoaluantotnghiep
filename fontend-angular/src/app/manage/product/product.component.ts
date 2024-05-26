import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionLoginService } from 'src/app/service/function-login.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router) { }

  ngOnInit(): void {
    // document.getElementById('product').classList.add('active');
  }

}
