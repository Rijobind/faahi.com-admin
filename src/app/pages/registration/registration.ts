import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration {
  // Form fields
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  businessName = '';
  fullName = '';
  taxId = '';
  regNumber = '';
  phone = '';
  country = '';

  // UI state
  message = '';
  isSuccess = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  onRegister() {
    // Extra validation
    if (!this.email || !this.username || !this.password || !this.confirmPassword) {
      this.message = 'Please fill all required fields';
      this.isSuccess = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.isSuccess = false;
      return;
    }

    const payload = {
      email: this.email,
      username: this.username,
      password: this.password,
      businessName: this.businessName,
      fullName: this.fullName,
      taxId: this.taxId,
      regNumber: this.regNumber,
      phone: this.phone,
      country: this.country
    };

    this.authService.signUpAccount(payload).subscribe({
      next: () => {
        this.message = 'Registration Successful!';
        this.isSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        if (err.error?.output === -1) {
          this.message = 'Username already exists';
        } else if (err.error?.output === -2) {
          this.message = 'Email already registered';
        } else {
          this.message = 'Registration Failed. Try again';
        }
        this.isSuccess = false;
      }
    });
  }

  gotoLogin() {
    this.router.navigate(['/']);
  }
}
