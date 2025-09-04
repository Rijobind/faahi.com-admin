import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  constructor(private router: Router) { }

  onResetPasword() {
    this.router.navigate(['/reset-password'])
  }

}
