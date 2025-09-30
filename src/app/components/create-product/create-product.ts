import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenubar } from "../../shared-component/side-menubar/side-menubar";
import { Header } from "../../shared-component/header/header";
import { Footer } from "../../shared-component/footer/footer";

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, SideMenubar, Header, Footer],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct {

  previewUrls: string[] = [];
  selectedFiles: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => this.previewUrls.push(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }


}
