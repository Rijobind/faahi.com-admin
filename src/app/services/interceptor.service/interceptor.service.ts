import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, switchMap, catchError, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Intercepted requestsss', req.url);

    const accessToken = this.auth.getAccessToken();
    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.auth.refreshAccessToken().pipe(
        switchMap((tokenResponse: any) => {
          this.isRefreshing = false;

          const newAccessToken = tokenResponse.accessToken;
          const newRefreshToken = tokenResponse.refreshToken;
          const rememberMe = !!localStorage.getItem('accessToken');

          this.auth.saveTokens(newAccessToken, newRefreshToken, rememberMe);
          this.refreshTokenSubject.next(newAccessToken);

          return next.handle(
            request.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            })
          );
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.auth.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap(token => {
          if (token) {
            return next.handle(
              request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              })
            );
          } else {
            return throwError(() => new Error('Token refresh failed'));
          }
        })
      );
    }
  }
}
