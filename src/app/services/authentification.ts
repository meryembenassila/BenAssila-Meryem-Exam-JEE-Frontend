import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Authentification {
  apiurl: string = 'http://localhost:8090';
  accessToken!: string;
  username!: string;
  roles!: string;
  isAuthenticated!: boolean;

  constructor(
    private httpclient: HttpClient,
    private router: Router,
  ) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };
    let params = new HttpParams().set('username', username).set('password', password);
    return this.httpclient.post(this.apiurl + '/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true; //
    this.accessToken = data['acces-tocken'];
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;

    window.localStorage.setItem('jwt-token', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = '';
    this.roles = '';
    window.localStorage.removeItem('acces-token');
    this.router.navigateByUrl('/login');
  }
}
