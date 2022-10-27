import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public pS: ProductService,
    private authService: AuthService,
    private router: Router,
  ) { }

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

}
