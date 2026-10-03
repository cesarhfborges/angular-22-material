import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [MatCardModule, MatFormField, MatInput, MatButton, FormsModule, MatLabel],
  selector: 'app-auth',
  styleUrl: './auth.scss',
  templateUrl: './auth.html',
})
export class Auth {
  name = '';
  password = '';
}
