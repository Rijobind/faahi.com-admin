import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  message: string = '';
  forgotForm: any;
  isSent: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      const email = this.forgotForm.value.email!;
      this.authService.postResetPassword(email).subscribe({
        next: () => {
          this.isLoading = false;
          this.isSent = true;
        },
        error: () => {
          this.isLoading = false;
          this.message = "Something went wrong, please try again.";
        }
      });
    }
  }
}
