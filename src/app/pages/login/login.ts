import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = 'admin@faahi.com';
  password: string = '123456';

  message: string = '';
  isSuccess: boolean = false;

  constructor(private router: Router) { }

  onLogin() {
    if (this.email === 'admin@faahi.com' && this.password === '123456') {
      this.message = ' Login Successful!';
      this.isSuccess = true;

      this.router.navigate(['/home']);
    } else {
      this.message = ' Invalid Email or Password';
      this.isSuccess = false;
    }
  }

  onEmailConfirmation() {
    this.router.navigate(['/email-confirmation'])
  }
}
