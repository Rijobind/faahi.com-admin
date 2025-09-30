import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, tap, throwError } from "rxjs";
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

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    }

    saveTokens(accessToken: string, refreshToken: string, rememberMe: boolean) {
        if (rememberMe) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
        }
    }

    refreshAccessToken(): Observable<any> {
        const request = this.getRefreshToken();
        if (!request) return throwError(() => new Error('No refresh token available'));

        return this.http.post(this.apiUrl + `/Authentication/refresh-token/${request}`, {});
    }

    signUpAccount(postData: any): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/create_account`,
            postData,
        ).pipe(
            tap(() => this._refreshNeeded$.next())
        );
    }

    verifyEmailToken(email: string, token: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Authentication/verify/${email}/${token}`,
            {},
        );
    }
    verifyPasswordToken(email: string, token: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/password_verify/${email}/${token}`,
            {},
        );
    }

    resendEmailToken(email: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Authentication/resend_verification/${email}`,
            {},
        );
    }

    resendEmailForPassword(email: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/send_reset_password/${email}`,
            {},
        )
    }

    verifyEmail(email: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Authentication/email_verify/${email}`,
            {},
        );
    }

    postLogin(username: string, password: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/login/${username}/${password}`,
            {},

        );
    }

    postIamSite(payload: any): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/im_site/`,
            payload
        );
    }


    postResetPassword(email: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/send_reset_password/${encodeURIComponent(email)}`,
            {},
        );
    }

    resetPassword(token: string, email: string, password: string) {
        return this.http.post(
            `${this.apiUrl}/Cobusiness/reset_password/${encodeURIComponent(token)}/${encodeURIComponent(email)}/${encodeURIComponent(password)}`,
            {},
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
