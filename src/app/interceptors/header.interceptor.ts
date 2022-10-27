import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor{
  // baseUrl = environment.path

  constructor(
    public http: HttpClient,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authStored = localStorage.getItem('authLogedin') || `{}`;
    const token: string =
      authStored !== '' && Object.keys(JSON.parse(authStored)).length
        ? JSON.parse(authStored).access_token
        : '';

    if (token) {
      return next.handle(
        request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      );
    }
    return next.handle(request);
  }

  // getHeader(): HttpHeaders {
  //   const headers = new HttpHeaders({
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     // 'Authorization': this.dS.token,
  //   });
  //   return headers;
  // }

  // get(url: string, params?: any) {
  //   let reqOpts: any;
  //     reqOpts = {
  //       params: new HttpParams(),
  //       headers: this.getHeader(),
  //       responseType: 'json'
  //     };
  //   if (params) {
  //     reqOpts.params = new HttpParams();
  //     for (const k in params) {
  //       reqOpts.params = reqOpts.params.set(k, params[k]);
  //     }
  //   }
  //   const returnData = this.http.get(url, reqOpts);
  //   return returnData;
  // }

  // post(url: string, body: any, reqAuth: boolean) {
  //   let reqOpts: any;
  //   if (reqAuth) {
  //     reqOpts = {
  //       headers: this.getHeader()
  //     };
  //   }
  //   const returnData = this.http.post(url, body, reqOpts);
  //   return returnData;
  // }

}
