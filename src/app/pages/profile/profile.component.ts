import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  ) { }

  ngOnInit(): void {
    this.aS.getUsrDtls().subscribe((res: any) => {
      this.usrDtls = res;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate([''])
    this.aS.logout().subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate([''])
    });
  }

  changePwd() {
    this.router.navigate(['/profile/change-password'])
  }

}
