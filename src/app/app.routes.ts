import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Clients } from './clients/clients';
import { NewCustomer } from './new-customer/new-customer';
import { Login } from './login/login';


export const routes: Routes = [
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'clients', component: Clients },
      { path: 'newclient', component: NewCustomer },
    ],
  },
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
