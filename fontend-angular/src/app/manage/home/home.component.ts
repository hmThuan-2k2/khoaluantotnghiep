import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../service/snack-bar.service';
import { Router } from '@angular/router';
import { FunctionLoginService } from 'src/app/service/function-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private functions_login: FunctionLoginService,
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById('home').classList.add('active');
  }

}