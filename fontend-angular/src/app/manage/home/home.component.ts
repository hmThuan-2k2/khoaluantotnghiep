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
  }

}
