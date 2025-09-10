import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-success',
  imports: [CommonModule],
  templateUrl: './verify-success.html',
  styleUrls: ['./verify-success.css']
})
export class VerifySuccess implements OnInit {

  message: string = '';
  isLoading: boolean = true;

  showButton: boolean = false;
  buttonLabel: string = '';
  buttonAction: () => void = () => { };
  messageColor: string = 'text-gray-500';

  private token: string = '';
  private email: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];

      if (this.token && this.email) {
        this.verifyEmail(this.email, this.token);
      } else {
        this.isLoading = false;
        this.message = 'Missing verification parameters!';
        this.showButton = false;
        this.messageColor = 'text-red-500';
      }
    });
  }

  verifyEmail(email: string, token: string) {
    this.authService.verifyEmailToken(email, token).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const msg = res.message?.trim() || '';
        this.message = msg;
        const messageMap: Record<string, { color: string, label?: string, action?: () => void }> = {
          'email verified successfully': {
            color: 'text-blue-500',
            label: 'Continue Setup',
            action: () => this.router.navigate(['/registration'])
          },
          'you have already verifyed': {
            color: 'text-green-500',
            label: 'Go to Registration',
            action: () => this.router.navigate(['/registration'])
          },
          'invalid or expired token': {
            color: 'text-red-500',
            label: 'Resend Verification Email',
            action: () => this.router.navigate(
              ['/email-confirmation'],
              { queryParams: { resend: true, email: this.email } }
            )
          },
          'invalid token': {
            color: 'text-red-500'
          }
        };

        const map = messageMap[msg.toLowerCase()];
        if (map) {
          this.messageColor = map.color;
          if (map.label && map.action) {
            this.showButton = true;
            this.buttonLabel = map.label;
            this.buttonAction = map.action;
          } else {
            this.showButton = false;
          }
        } else {
          this.showButton = false;
          this.messageColor = 'text-gray-500';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again.';
        this.showButton = false;
        this.messageColor = 'text-red-500';
        console.error(err);
      }
    });
  }

  onButtonClick() {
    if (this.buttonAction) this.buttonAction();
  }
}
