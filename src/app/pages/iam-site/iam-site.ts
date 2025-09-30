import { Component, HostListener, OnInit } from '@angular/core';
import { Footer } from "../../shared-component/footer/footer";
import { Header } from "../../shared-component/header/header";
import { SideMenubar } from "../../shared-component/side-menubar/side-menubar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendapiService } from '../../services/backendapi.service/backendapi.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-iam-site',
  standalone: true,
  imports: [Footer, Header, SideMenubar, CommonModule, FormsModule],
  templateUrl: './iam-site.html',
  styleUrls: ['./iam-site.css']
})
export class IamSite implements OnInit {

  dropdownOpen: boolean = false;
  countries: any[] = [];
  currencies: any[] = [];
  selectedCurrency: any = null;
  statusChecked: boolean = true;
  onHoldChecked: boolean = true;
  companyId: string = '';
  notificationMessage: string = '';
  showNotification: boolean = false;
  popupMessage: string = '';
  popupType: 'success' | 'error' = 'success';

  formData: any = {
    site_name: '',
    avl_countries_id: '',
    currency_code: '',
    company_id: '',
    im_item_site: [
      {
        bin_number: '',
        primary_vendor_id: '',
        on_hand_quantity: 0,
        committed_quantity: 0,
        purchase_order_quantity: 0,
        sales_order_quantity: 0,
        c_price: 0,
        status: 'T', // toggle active by default
        on_hold: 'T',  // toggle active by default
      }
    ]
  };

  constructor(
    private service: BackendapiService,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadCurrencies();
    this.setCompanyIdFromToken();
    this.statusChecked = this.formData.im_item_site[0].status === 'T';
    this.onHoldChecked = this.formData.im_item_site[0].on_hold === 'T';
  }

  setCompanyIdFromToken(): void {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.companyId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '';
        this.formData.company_id = this.companyId;
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }

  loadCurrencies(): void {
    this.service.getCurrencyList().subscribe({
      next: (res) => {
        this.currencies = res.data || [];
        console.log("list ", this.currencies)
      },
      error: (err) => console.error("Error fetching currencies:", err)
    });
  }

  onCurrencySelect(selected: any) {
    this.selectedCurrency = selected;
    if (selected) {
      this.formData.avl_countries_id = selected.avl_countries_id; // update country ID
      this.formData.currency_code = selected.currency_code;       // update currency code
    }
  }


  updateStatus(value: boolean) {
    this.formData.im_item_site[0].status = value ? 'T' : 'F';
  }
  updateOnHold(value: boolean) {
    this.formData.im_item_site[0].on_hold = value ? 'T' : 'F';
  }

  submitForm(): void {
    console.log("Form Data to Post:", this.formData);
    this.authentication.postIamSite(this.formData).subscribe({

      next: () => {
        this.popupMessage = 'Site Created Successfully!';
        this.popupType = 'success';

        this.resetForm();

      }
      ,
      error: (err) => {
        this.popupMessage = 'Error creating site!';
        this.popupType = 'error';

        console.error("Error posting data:", err);
      }

    });
  }

  closePopup(): void {
    this.popupMessage = '';
  }

  resetForm(): void {
    this.formData = {
      site_name: '',
      avl_countries_id: '',
      currency_code: '',
      company_id: this.companyId, // keep the company ID
      im_item_site: [
        {
          bin_number: '',
          primary_vendor_id: '',
          on_hand_quantity: 0,
          committed_quantity: 0,
          purchase_order_quantity: 0,
          sales_order_quantity: 0,
          c_price: 0,
          status: 'T',
          on_hold: 'T'
        }
      ]
    };

    this.statusChecked = true;
    this.onHoldChecked = true;
    this.selectedCurrency = null;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.querySelector('button[dropdown-toggle]');
    const dropdownMenu = document.querySelector('ul[dropdown-menu]');
    if (this.dropdownOpen &&
      dropdownButton && !dropdownButton.contains(target) &&
      dropdownMenu && !dropdownMenu.contains(target)) {
      this.dropdownOpen = false;
    }
  }
}
