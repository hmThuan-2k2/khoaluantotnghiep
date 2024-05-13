import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../service/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
