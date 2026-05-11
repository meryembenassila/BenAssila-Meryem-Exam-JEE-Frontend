import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewCustomerService {
  constructor(private httpClient: HttpClient) {}
  apiUrl: string = 'http://localhost:8090';
  ajouterCustomer(customer: any) {
    return this.httpClient.post(this.apiUrl + '/clients/save', customer);
  }
}
