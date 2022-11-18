import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { HeaderInterceptor } from './header.interceptor';
// import { ApiConfig } from '../interfaces/api';
import axios from 'axios';
import { environment } from 'src/environments/environment';

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
];

export class Api {
  path!: string;
  //   apiKey!: string;
  //   header!:object;

  constructor() {
    // if (apiConfig) {
    this.path = environment.path;
    //   this.apiKey = apiConfig.apiKey;
    // }

    // this.header = {
    //   'Authorization': `Basic ${this.apiKey}` 
    //  }
  }

  // async post(path: string, params: object) {
  //   return await axios.post(path, params)
  // }

  // async get(path: string, params: object) {
  //   return await axios.post(path, params)
  // }

  // async put(path: string, params: object) {
  //   return await axios.put(path, params)
  // }

  //   static _instance: Api | undefined;
  //   public static get instance() {
  //     if (!this._instance) {
  //       this._instance = new Api(environment.apiConfig);
  //     }
  //     return this._instance;
  //   }
}
