import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, Navbar],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
