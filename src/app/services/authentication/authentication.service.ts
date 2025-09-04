import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "../../environtments/environment/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _refreshNeeded$ = new Subject<void>();
    apiUrl: string = environment.ApiUrl;

    constructor(private http: HttpClient) { }

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

        const body = { username, password }; // 👈 send credentials in body

        return this.http.post(
            `${this.apiUrl}/Cobusiness/login`,
            body,
            { headers }
        );
    }



}
