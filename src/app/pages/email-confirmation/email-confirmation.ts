import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';

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

  popupMessage: string | null = null;
  popupType: 'success' | 'error' | null = null;

  isResend: boolean = false;
  prefilledEmail: string = '';
  prefilledToken: string = '';


  constructor(private fb: FormBuilder, private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // check if redirected from verify-success with resend flag
    this.route.queryParams.subscribe(params => {
      this.isResend = params['resend'] === 'true';

      if (params['email']) {
        this.prefilledEmail = params['email'];
        this.emailForm.patchValue({ email: this.prefilledEmail });
      }

      if (params['token']) {
        this.prefilledToken = params['token'];   // ✅ save token
      }
    });

  }

  get emailControl() {
    return this.emailForm.get('email');
  }
  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.isLoading = true;

      const apiCall = this.isResend
        ? this.authService.resendEmailToken(email)
        : this.authService.verifyEmail(email);

      apiCall.subscribe({
        next: (res) => {
          console.log("Verification response:", res);
          if (res.success && res.status === 1) {
            this.showPopup(res.message || `Verification email sent to ${email}`, 'success');
          } else {
            this.showPopup(res.message || "Something went wrong", 'error');
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error verifying email", err);
          this.showPopup("Failed to send verification. Please try again.", 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.emailControl?.markAsTouched();
    }
  }

  showPopup(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
  }

  closePopup() {
    this.popupMessage = null;
    this.popupType = null;
  }

}
