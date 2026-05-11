import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Clients } from './clients/clients';
import { NewCustomer } from './new-customer/new-customer';


export const routes: Routes = [
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'clients', component: Clients },
      { path: 'newclient', component: NewCustomer },
    ],
  },
];
