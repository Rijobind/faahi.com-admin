import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';  // ✅ import your service

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  message: string = '';
  isSuccess: boolean = false;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.message = ' Passwords do not match';
      this.isSuccess = false;
      return;
    }

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.signUpAccount(payload).subscribe({
      next: () => {
        this.message = ' Registration Successful!';
        this.isSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.message = ' Registration Failed. Try again';
        this.isSuccess = false;
      }
    });
  }

  gotoLogin() {
    this.router.navigate(['/']);
  }
}
