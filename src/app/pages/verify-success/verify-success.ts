import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-success',
  imports: [],
  templateUrl: './verify-success.html',
  styleUrls: ['./verify-success.css']
})
export class VerifySuccess {

  constructor(private router: Router) { }

  OnRegister() {
    this.router.navigate(['/registration'])
  }
}
