import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedPrd: any;
  cartList: any[] = [];
  viewList: any[] = [];
  catList: any[] = [];
  path = environment.path;


  constructor(
    private http: HttpClient
  ) { }

  getPrdList() {
    return this.http.get(this.path + `/v1/products`);
  }

  getCatList() {
    // if (this.catList.length === 0) {
    //   const seq = this.api.get(this.api.path + `/v1/category-lists`);
    //   seq.subscribe((res: any) => {
    //     this.catList = res.results
    //   });
    // }
  }

  cartItem() {
    return this.cartList.length;
  }
}
