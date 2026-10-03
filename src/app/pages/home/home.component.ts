import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
