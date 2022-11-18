import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usrDtls: any;

  constructor(
    private aS: AuthService,
    private router: Router,
    private pS: ProductService
  ) { }

  ngOnInit(): void {
    this.aS.getUsrDtls().subscribe((res: any) => {
      if (res.status_code == 200) {
        this.usrDtls = res.info;
      }
    });
  }

  logout() {
    this.aS.logout().subscribe({
      next: (res: any) => {
        localStorage.clear();
        this.router.navigate(['']);
        this.pS.cartList = [];
      }, error: (err: any) => {
        if (err.statusText == 'Unauthorized') {
          this.aS.refreshToken();
        }
      }
    });
  }

  changePwd() {
    this.router.navigate(['/profile/change-password'])
  }

  editProfile() {
    this.router.navigate(['/profile/edit-profile']);
    this.aS.usrDtls = this.usrDtls;
  }

  editAddress() {

  }

}
