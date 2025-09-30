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

  onLogin() {
    this.isLoading = true;

    if (!this.email || !this.password) {
      this.errorMessage = "Please fill in all fields.";
      this.isLoading = false;
      return;
    }

    this.loginService.postLogin(this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.status === 1 && res.token) {
          const payload = JSON.parse(atob(res.token.accessToken.split('.')[1]));
          const companyId = payload.company_id;

          localStorage.setItem('company_id', companyId);
          console.log("✅ Login successful:", res);

          this.message = 'Login Successful!';
          this.isSuccess = true;

          if (this.rememberMe) {
            localStorage.setItem('accessToken', res.token.accessToken);
            localStorage.setItem('refreshToken', res.token.refreshToken);
            localStorage.setItem('user', JSON.stringify(res));
          } else {
            sessionStorage.setItem('accessToken', res.token.accessToken);
            sessionStorage.setItem('refreshToken', res.token.refreshToken);
            sessionStorage.setItem('user', JSON.stringify(res));
          }

          // ✅ Token is now saved, so it's safe to log it
          const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

          console.log('accessToken:', accessToken);

          // 🔑 Decode token to extract company_id
          if (accessToken) {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            console.log('Decoded payload:', payload);

            // Use the nameidentifier claim as company/user ID
            const companyId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            console.log('🏢 Company ID:', companyId);

            // Save it if needed
            localStorage.setItem('company_id', companyId);
          }

          this.router.navigate(['/home']);
        } else {
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
