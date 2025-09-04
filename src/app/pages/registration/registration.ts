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
      company_id: null,
      business_name: this.businessName || null,
      tin_number: this.taxId || null,
      name: this.fullName || null,
      password: this.password || null,
      reg_no: this.regNumber || null,
      country: this.country || null,
      address: null,
      logo_fileName: null,
      phoneNumber: this.phone || null,
      created_at: null,
      plan_type: null,
      sites_allowed: null,
      createdSites: null,
      edit_date_time: null,
      edit_user_id: null,
      email: this.email || null,
      co_addresses: [
        {
          company_address_id: null,
          company_id: null,
          street_1: null,
          street_2: null,
          city: null,
          state: null,
          postal_code: null,
          country: this.country || null,
          telephone_1: this.phone || null,
          telephone_2: null,
          email: this.email || null,
          status: "T",
          edit_date_time: null,
          edit_user_id: null,
          contact_person: this.fullName || null
        }
      ]
    };


    this.authService.signUpAccount(payload).subscribe({
      next: () => {
        this.message = 'Registration Successful!';
        this.isSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/']);
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
