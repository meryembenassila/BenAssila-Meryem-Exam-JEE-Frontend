import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl: string = 'http://localhost:8090';


  constructor(private httpClient: HttpClient) {}

  public getCustomers(): Observable<any[]> {
      return this.httpClient.get<any[]>(this.apiUrl + '/clients');
    }

  public deleteCustomers(id: any) {
      return this.httpClient.delete(this.apiUrl + '/clients/delete/' + id);
    }

    searchCustomers(keyword: string): Observable<Array<any>> {
      console.log('service' + keyword);
      console.log(this.apiUrl + '/clients/search?keyword=' + keyword);
      return this.httpClient.get<Array<any>>(this.apiUrl + '/clients/search?keyword=' + keyword);
    }

}
