import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './manage/home/home.component';
import { ManageComponent } from './manage/manage.component';
import { RestaurantComponent } from './manage/restaurant/restaurant.component';
import { CashierComponent } from './manage/restaurant/cashier/cashier.component';
import { TableComponent } from './manage/restaurant/table/table.component';
import { ProductComponent } from './manage/product/product.component';
import { MenuComponent } from './manage/product/menu/menu.component';
import { PrintComponent } from './manage/restaurant/cashier/print/print.component';
import { PrintProvisionalInvoiceComponent } from './manage/restaurant/cashier/print/print-provisional-invoice/print-provisional-invoice.component';
import { KitchenComponent } from './manage/restaurant/kitchen/kitchen.component';
import { CustomerComponent } from './manage/restaurant/customer/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ManageComponent,
    RestaurantComponent,
    CashierComponent,
    TableComponent,
    ProductComponent,
    MenuComponent,
    PrintComponent,
    PrintProvisionalInvoiceComponent,
    KitchenComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
