import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environtments/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BackendapiService {
  private _refreshNeeded$ = new Subject<void>();
  apiUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }
  getlistOfActiveUsers(): Observable<any> {

    return this.http.get(environment.ApiUrl + "/Authentication/am_users");
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }

  getlistOfcategory(): Observable<any> {
    const token = this.getToken();
    return this.http.get(environment.ApiUrl + "/im_product/get_all_category");
  }

  getCurrencyList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Cobusiness/currency_list`);
  }

}
