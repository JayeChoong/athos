import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  path = environment.base;
  cartList: any[] = [];


  constructor(
    public pS: ProductService,
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.isLogedin) {
      this.pS.getCartList().subscribe({
        next: async (res: any) => {
          if (res.status_code == 200) {
            res.info.results.map((itm: any) => {

              const variant: any = {}
              itm.selected_variant.product_variant_values.forEach((item: any) => {
                variant[item['name']] = item['value'];
              });
              itm.selected_variant = Object.assign(itm.selected_variant, variant);

              const images = [];
              for (const it of itm.selected_variant.product_variant_images) {
                const img = this.path + it;
                images.push(img);
              }
              itm.selected_variant.product_variant_images = images
            })
            this.cartList = await res.info.results;
            this.pS.cartList = this.cartList;
          }
        }, error: (err: any) => {
          if (err.statusText == 'Unauthorized') {
            this.authService.refreshToken();

          }
        }
      })
    } else {
      this.cartList = this.pS.cartList;
      console.log(this.cartList);
    }
  }

  ngOnInit(): void {
  }

  updateUrl(evt: any, itm: any) {
    if (evt.type === 'error') {
      itm.image = "./assets/about.png"
    }
  }

  checkout() {
    if (this.authService.isLogedin) {
      // this.router.navigate(['/profile'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  getTotal() {
    let total = 0;
    for (const obj of this.cartList) {

      total = total + (obj.selected_variant.price * obj.quantity);
    }
    return total;
  }

  getEachTotal(cart: any) {
    let total = 0;
    total = total + (cart.selected_variant.price * cart.quantity);
    return total;
  }

  deletePrd(cart: any) {
    if (this.authService.isLogedin) {
      this.pS.deleteCart(cart).subscribe((res: any) => {
        // if (res.status_code == 204) {
          this.cartList = this.cartList.filter(obj => obj.id !== cart.id);
        // }
      });
    } else {
      this.cartList = this.cartList.filter(obj => obj.selected_variant.id !== cart.selected_variant.id);
    }
    this.pS.cartList = this.cartList

  }

 updateTotal(evt: any, cart: any) {
    if (this.authService.isLogedin) {
      this.pS.updateCart(cart).subscribe((res: any) => {
        console.log(res);
        // if (res.status_code == 204) {
          // this.cartList = this.cartList.filter(obj => obj.id !== cart.id);
        // }
      });
    } else {
      this.cartList.map(obj => {
        if (obj.selected_variant.id === cart.selected_variant.id) {
          obj.quantity = evt.target.valueAsNumber;
        }
      });
      this.pS.cartList = this.cartList;
    }
  }

}
