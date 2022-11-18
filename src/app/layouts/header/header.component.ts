import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public pS: ProductService
  ) { }

  ngOnInit(): void {
    if (this.pS.catList.length == 0) {
      this.pS.getCatList()
    }
  }

  getLogin() {
    if (this.authService.isLogedin) {
      this.router.navigate(['/profile'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  getCart() {
      this.router.navigate(['/cart'])
  }
}
