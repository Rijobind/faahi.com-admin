import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  showPassword = false;
  password = '';
  showConfirmPassword = false;
  confirmPassword = '';
  email: string = '';
  token: string = '';
  message: string = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
      console.log('token:', this.token, 'email:', this.email);
    });
  }

  onSubmit() {
    if (!this.password || this.password !== this.confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }

    this.isLoading = true;

    this.authService.resetPassword(this.token, this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.message = "Password reset successful! Redirecting to login...";
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err?.error || "Something went wrong!";
        console.error(err);
      }
    });
  }
}
