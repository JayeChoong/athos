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
  sizeList: any[] = [];
  colorList: any[] = [];
  path = environment.path;

  constructor(
    private http: HttpClient
  ) { }

  getPrdList(filter: any) {
    return this.http.get(this.path + `/v1/products/`+ filter);
  }

  getPrdDtls(id: any) {
    return this.http.get(this.path + `/v1/products/${id}/`);
  }

  getCatList() {
    this.http.get(this.path + `/v1/category-lists/`).subscribe((res: any) => {
      if (res.status_code == 200) {
        this.catList = res.info.results
      }
    });
  }

  getColorList() {
    this.http.get(this.path + `/v1/category/color/`).subscribe((res: any) => {
      if (res.status_code == 200) {
        this.colorList = res.info.results;
        this.colorList.map(obj => obj.name = obj.value);
      }
    });
  }

  getSizeList() {
    this.http.get(this.path + `/v1/category/size/`).subscribe((res: any) => {
      if (res.status_code == 200) {
        this.sizeList = res.info.results;
        this.sizeList.map(obj => obj.name = obj.value);
      }
    });
  }

  addToCart(cart: any) {
    console.log(cart);
    let body = {
      product: cart.product.id,
      quantity: cart.quantity,
      selected_variant: cart.selected_variant.id
    }
    return this.http.post(this.path + `/v1/cart/`, body);
  }

  getCartList() {
    return this.http.get(this.path + `/v1/cart/`)
  }

  cartItemUser() {
    this.http.get(this.path + `/v1/cart/`).subscribe((res: any) => {
      if (res.status_code == 200) {
        this.cartList = res.info.results;
      }
    });
  }

  cartItem() {
    return this.cartList.length;
  }

  deleteCart(cart: any) {
    return this.http.delete(this.path + `/v1/cart-item/${cart.id}/`)
  }

  updateCart(cart: any) {
    let body = {
      quantity: cart.quantity,
    }
    return this.http.patch(this.path + `/v1/cart-item/${cart.id}/`, body)
  }
}
