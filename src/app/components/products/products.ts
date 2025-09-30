import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenubar } from "../../shared-component/side-menubar/side-menubar";
import { Header } from "../../shared-component/header/header";
import { Footer } from "../../shared-component/footer/footer";

@Component({
  selector: 'app-products',
  imports: [SideMenubar, Header, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  constructor(private router: Router) { }

  onCreateProduct() {
    this.router.navigate(['/create-product'])
  }
}
