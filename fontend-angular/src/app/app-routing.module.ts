import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './manage/home/home.component';
import { ManageComponent } from './manage/manage.component';
import { RestaurantComponent } from './manage/restaurant/restaurant.component';
import { CashierComponent } from './manage/restaurant/cashier/cashier.component';


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
            path: '',
            redirectTo: '/manage/restaurant/cashier',
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
