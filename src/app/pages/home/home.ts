import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { SideMenubar } from "../../shared-component/side-menubar/side-menubar";
import { Header } from "../../shared-component/header/header";
import { SalesRevenueOverview } from "../../shared-component/sales-revenue-overview/sales-revenue-overview";
import { MonthlyOrderGoal } from "../../shared-component/monthly-order-goal/monthly-order-goal";
import { ProductOrders } from "../../shared-component/product-orders/product-orders";
import { CustomerService } from "../../shared-component/customer-service/customer-service";
import { SalesThisMonth } from "../../shared-component/sales-this-month/sales-this-month";
import { Audience } from "../../shared-component/audience/audience";
import { Footer } from "../../shared-component/footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SideMenubar, Header, SalesRevenueOverview, MonthlyOrderGoal, ProductOrders, CustomerService, SalesThisMonth, Audience, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngAfterViewInit() {
    new Chart("orderChart", {
      type: 'line',
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          { label: "Pending", data: [18, 20, 22, 25, 28, 30, 26, 24, 29, 32, 34, 36], borderColor: "purple" },
          { label: "New Orders", data: [30, 28, 32, 24, 26, 30, 28, 22, 26, 34, 38, 30], borderColor: "blue" }
        ]
      }
    });
  }
}
