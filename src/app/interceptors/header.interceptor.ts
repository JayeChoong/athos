import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders,
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor{
  baseUrl = environment.path

  constructor(
    public http: HttpClient,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
      },
      (err: any) => {

      }));
  }

  getHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': this.dS.token,
    });
    return headers;
  }

  get(url: string, params?: any) {
    let reqOpts: any;
      reqOpts = {
        params: new HttpParams(),
        headers: this.getHeader(),
        responseType: 'json'
      };
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    const returnData = this.http.get(url, reqOpts);
    return returnData;
  }

}
