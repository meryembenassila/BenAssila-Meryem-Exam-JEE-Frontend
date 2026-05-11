import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewCustomerService } from '../services/new-customer-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})
export class NewCustomer {
  protected ForrmNewCustomer!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private newCustomerService: NewCustomerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.ForrmNewCustomer = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    });
  }

  public handelNewCustomer() {
    let name = this.ForrmNewCustomer.value.name;
    let email = this.ForrmNewCustomer.value.email;

    let customer = { name: name, email: email };

    this.newCustomerService.ajouterCustomer(customer).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/admin/clients');
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }
}
