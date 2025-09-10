import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
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

  errorMessage: string = '';

  rememberMe: boolean = false;

  constructor(private router: Router, private loginService: AuthenticationService) { }

  // onLogin() {
  //   this.isLoading = true;

  //   if (!this.email || !this.password) {
  //     this.errorMessage = "Please fill in all fields.";
  //     return;
  //   }

  //   this.loginService.postLogin(this.email, this.password).subscribe({
  //     next: (res) => {
  //       this.isLoading = false;

  //       if (res.status === 1 && res.token) {
  //         console.log("✅ Login successful:", res);

  //         this.message = 'Login Successful!';
  //         this.isSuccess = true;

  //         localStorage.setItem('token', res.token);
  //         localStorage.setItem('user', JSON.stringify(res));

  //         this.router.navigate(['/home']);
  //       }
  //       else {
  //         console.log("❌ Login failed:", res.message);
  //         this.message = res.message || 'Invalid Email or Password';
  //         this.isSuccess = false;
  //       }
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       this.message = 'Invalid Email or Password';
  //       this.isSuccess = false;
  //     }
  //   });
  // }

  onLogin() {
    this.isLoading = true;

    if (!this.email || !this.password) {
      this.errorMessage = "Please fill in all fields.";
      this.isLoading = false; // fix stuck loading
      return;
    }

    this.loginService.postLogin(this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.status === 1 && res.token) {
          console.log("✅ Login successful:", res);

          this.message = 'Login Successful!';
          this.isSuccess = true;

          // Save token depending on RememberMe
          if (this.rememberMe) {
            console.log("Remember Me:", this.rememberMe);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res));
          } else {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('user', JSON.stringify(res));
          }

          this.router.navigate(['/home']);
        }
        else {
          console.log("❌ Login failed:", res.message);
          this.message = res.message || 'Invalid Email or Password';
          this.isSuccess = false;
        }
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
