import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';

  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private loginService: AuthenticationService) { }

  onLogin() {
    this.isLoading = true;

    this.loginService.postLogin(this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'Login Successful!';
        this.isSuccess = true;

        // store token or user data if backend returns it
        localStorage.setItem('user', JSON.stringify(res));

        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = 'Invalid Email or Password';
        this.isSuccess = false;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.getElementById('hs-toggle-password') as HTMLInputElement;
    if (input) {
      input.type = this.showPassword ? 'text' : 'password';
    }
  }

  onEmailConfirmation() {
    this.router.navigate(['/email-confirmation']);
  }

  onforgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
