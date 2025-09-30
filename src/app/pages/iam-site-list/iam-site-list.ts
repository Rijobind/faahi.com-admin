import { Component } from '@angular/core';
import { Footer } from "../../shared-component/footer/footer";
import { Header } from "../../shared-component/header/header";
import { SideMenubar } from "../../shared-component/side-menubar/side-menubar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-iam-site-list',
  imports: [Footer, Header, SideMenubar],
  templateUrl: './iam-site-list.html',
  styleUrl: './iam-site-list.css'
})
export class IamSiteList {

  constructor(private router: Router) { }

  onIamSite() {
    this.router.navigate(['/iam-site'])
  }

}
