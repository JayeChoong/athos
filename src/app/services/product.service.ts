import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderInterceptor } from '../interceptors/header.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedPrd: any;

  constructor(
    private api: HeaderInterceptor
  ) { }

  getPrdList(_in: any) {
    const seq = this.api.get(this.api.baseUrl + `products`);
    seq.subscribe((res: any) => {
      _in.prdList = res.results;
      _in.allPrdList = res.results;

    });
  }

  getCatList(_in: any) {
    const seq = this.api.get(this.api.baseUrl + `category-lists`);
    seq.subscribe((res: any) => {
      _in.catList = res.results
    });
  }
}
