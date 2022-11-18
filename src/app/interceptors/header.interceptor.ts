import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class HeaderInterceptor {
  // baseUrl = environment.path

  constructor(
    public http: HttpClient,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authStored = localStorage.getItem('authLogedin') || `{}`;
    const token: string =
      authStored !== '' && Object.keys(JSON.parse(authStored)).length
        ? JSON.parse(authStored).access_token
        : '';
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.authService.refreshToken().subscribe((res: any) => {
              if (res.status_code == 200) {
                console.log('1')
                const authStored = localStorage.getItem('authLogedin') || `{}`;
                const data = JSON.parse(authStored);
                data.access_token = res.info.access;
                localStorage.setItem('authLogedin', JSON.stringify(data));
              }
              return next.handle(request)

            });
          }
          return throwError(() => error)
        })
      );
  }

}
