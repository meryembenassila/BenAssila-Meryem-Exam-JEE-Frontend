import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../services/client-service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  clients!: Array<any>;
  errorMessage!: string;
  formGroupClients!: FormGroup;
  constructor(
    private customersService: ClientService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.getCustomers();

    this.formGroupClients = this.fb.group({ keyword: this.fb.control('') });
  }

  public getCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (data) => {
        this.clients = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(this.errorMessage);
        this.cdr.detectChanges();
      },
    });
  }

  public handeledelete(id: any) {
    console.log(id);

    this.customersService.deleteCustomers(id).subscribe({
      next: () => {
        this.getCustomers();
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err);
      },
    });
  }

  handeleSearchClients() {
    let Keyword = this.formGroupClients?.value.keyword;
    console.log(Keyword);
    this.customersService.searchCustomers(Keyword).subscribe({
      next: (data) => {
        this.clients = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.cdr.detectChanges();
      },
    });
  }
}
