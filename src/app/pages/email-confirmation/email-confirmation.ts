import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './email-confirmation.html',
  styleUrls: ['./email-confirmation.css']
})
export class EmailConfirmation implements OnInit {
  emailForm: any;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get emailControl() {
    return this.emailForm.get('email');
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.isLoading = true;

      this.authService.verifyEmail(email).subscribe({
        next: (res) => {
          console.log("Verification response:", res);
          alert("Verification email sent to " + email);
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error verifying email", err);
          alert("Failed to send verification. Please try again.");
          this.isLoading = false;
        }
      });
    } else {
      this.emailControl?.markAsTouched();
    }
  }
}
