import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';


@Injectable()
export class HeaderInterceptor {
  path = environment.path;
  isRefreshingToken = false;

  constructor(
    public http: HttpClient,
    private aS: AuthService,
    private router: Router,
    private pS: ProductService

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any | HttpEvent<any>> {
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
        catchError((error) => {
          if (error.status == 401) {
            if (!this.isRefreshingToken) {
              this.isRefreshingToken = true;
              return this.refreshToken().pipe(
                switchMap((res: any) => {
                  const authStored = localStorage.getItem('authLogedin') || `{}`;
                  const data = JSON.parse(authStored);
                  data.access_token = res.info.access;
                  localStorage.setItem('authLogedin', JSON.stringify(data));
                  request = request.clone({ setHeaders: { Authorization: `Bearer ${res.info.access}` } })
                  return next.handle(request);
                }), catchError(err => {
                  localStorage.clear();
                  this.pS.cartList = [];
                  this.router.navigate(['/login']);
                  return throwError(() => err)
                }),
                finalize(() => {
                  this.isRefreshingToken = false;
                })
              );
            }
          }
          return throwError(() => error)
        })
      );
  }

  refreshToken() {
    const authStored = localStorage.getItem('authLogedin') || `{}`;
    const data = JSON.parse(authStored);
    return this.http.post(this.path + `/rest-auth/token/refresh/`, { refresh: data.refresh_token });

    // data.access_token = res.info.access;
    // localStorage.setItem('authLogedin', JSON.stringify(data));


  }



}
