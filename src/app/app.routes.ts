import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home').then(a => a.Home) },
    { path: 'header', loadComponent: () => import('./components/shared-component/header/header').then(a => a.Header) },
    { path: 'footer', loadComponent: () => import('./components/shared-component/footer/footer').then(a => a.Footer) },
    { path: 'side-menubar', loadComponent: () => import('./components/shared-component/side-menubar/side-menubar').then(a => a.SideMenubar) },
    { path: 'sales-revenue-overview', loadComponent: () => import('./components/shared-component/sales-revenue-overview/sales-revenue-overview').then(a => a.SalesRevenueOverview) },
    { path: 'traffic-resources', loadComponent: () => import('./components/shared-component/traffic-resources/traffic-resources').then(a => a.TrafficResources) },
    { path: 'product-orders', loadComponent: () => import('./components/shared-component/product-orders/product-orders').then(a => a.ProductOrders) },
    { path: 'customer-service', loadComponent: () => import('./components/shared-component/customer-service/customer-service').then(a => a.CustomerService) },
    { path: 'sales-this-month', loadComponent: () => import('./components/shared-component/sales-this-month/sales-this-month').then(a => a.SalesThisMonth) },
    { path: 'top-selling-products', loadComponent: () => import('./components/shared-component/top-selling-products/top-selling-products').then(a => a.TopSellingProducts) },
    { path: 'audience', loadComponent: () => import('./components/shared-component/audience/audience').then(a => a.Audience) },
];