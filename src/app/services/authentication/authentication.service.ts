import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "../../environtments/environment/environment";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _refreshNeeded$ = new Subject<void>();
    apiUrl: string = environment.ApiUrl;

    constructor(private http: HttpClient, private routes: Router) { }

    signUpAccount(postData: any): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'text/plain',
            'Content-Type': 'application/json; charset=UTF-8'
        });

        return this.http.post(
            `${this.apiUrl}/Cobusiness/create_account`,
            postData,
            { headers }
        ).pipe(
            tap(() => this._refreshNeeded$.next())
        );
    }

    verifyEmailToken(email: string, token: string): Observable<any> {
        let headers = new HttpHeaders({ 'accept': 'application/json' });

        return this.http.post(
            `${this.apiUrl}/Authentication/verify/${email}/${token}`,
            {},
            { headers }
        );
    }

    resendEmailToken(email: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Authentication/resend_verification/${email}`,
            {},
        );
    }

    verifyEmail(email: string): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json'
        });
        return this.http.post(
            `${this.apiUrl}/Authentication/email_verify/${email}`,
            {},
            { headers }
        );
    }

    postLogin(username: string, password: string): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this.http.post(
            `${this.apiUrl}/Cobusiness/login/${username}/${password}`,
            {},
            { headers }
        );
    }

    postResetPassword(email: string): Observable<any> {
        let headers = new HttpHeaders({
            'accept': 'application/json'
        });

        return this.http.post(
            `${this.apiUrl}/Cobusiness/send_reset_password/${encodeURIComponent(email)}`,
            {},
            { headers }
        );
    }

    resetPassword(token: string, email: string, password: string) {
        const headers = new HttpHeaders({
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(
            `${this.apiUrl}/Cobusiness/reset_password/${encodeURIComponent(email)}/${encodeURIComponent(password)}`,
            {},
            { headers }
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.routes.navigate(['/']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

}
