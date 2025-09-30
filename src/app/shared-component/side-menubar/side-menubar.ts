import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menubar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menubar.html',
  styleUrls: ['./side-menubar.css']
})
export class SideMenubar {
  @Input() isSidebarOpen: boolean = true;
  openDropdown: string | null = null;

  constructor(private router: Router) { }

  toggleDropdown(menu: string) {
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }

  navigateToMainLayout() {
    this.router.navigate(['/main-layout']);
  }
  onProducts() {
    this.router.navigate(['/products'])
  }
  onHome() {
    this.router.navigate(['/home'])
  }
  onIamSite() {
    this.router.navigate(['/iam-site'])
  }
  onIamSiteList() {
    this.router.navigate(['/iam-site-list'])
  }
}
