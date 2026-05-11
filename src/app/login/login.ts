import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authentification } from '../services/authentification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  FormLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceauth: Authentification,
    private router: Router,
  ) {}

  ngOnInit() {
    this.FormLogin = this.fb.group({
      username: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      password: this.fb.control(null, Validators.required),
    });
  }

  protected handeLoginCustomer() {
    let username = this.FormLogin.value.username;
    let password = this.FormLogin.value.password;

    this.serviceauth.login(username, password).subscribe({
      next: (data) => {
        console.log(data);
        this.serviceauth.loadProfile(data);
        this.router.navigateByUrl('/admin'); //!!!
      },
      error: (err) => {
        console.log('Erreur', err);
      },
    });
  }
}
