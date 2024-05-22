import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './manage/home/home.component';
import { ManageComponent } from './manage/manage.component';
import { RestaurantComponent } from './manage/restaurant/restaurant.component';
import { CashierComponent } from './manage/restaurant/cashier/cashier.component';
import { TableComponent } from './manage/restaurant/table/table.component';
import { ProductComponent } from './manage/product/product.component';
import { MenuComponent } from './manage/product/menu/menu.component';
import { PrintComponent } from './manage/restaurant/cashier/print/print.component';
import { PrintProvisionalInvoiceComponent } from './manage/restaurant/cashier/print/print-provisional-invoice/print-provisional-invoice.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manage',
    component: ManageComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'restaurant',
        component: RestaurantComponent,
        children: [
          {
            path: 'cashier',
            component: CashierComponent,
          },
          {
            path: 'table',
            component: TableComponent,
          },
          {
            path: '',
            redirectTo: '/manage/restaurant/cashier',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'product',
        component: ProductComponent,
        children: [
          {
            path: 'menu',
            component: MenuComponent,
          },
          {
            path: '',
            redirectTo: '/manage/product/menu',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/manage/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'print',
    outlet: 'print',
    component: PrintComponent,
    children: [
      {
        path: 'provisionalinvoice/:provisionalinvoiceIds',
        component: PrintProvisionalInvoiceComponent
      }
    ],
  },
  {
    path: '',
    redirectTo: '/manage/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
