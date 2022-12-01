import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  declare registerForm: FormGroup;
  declare loginForm: FormGroup;
  // isChecked = false;
  isSubmitLogin = false;
  isSubmitRegister = false
  isLogin = true;
  msg: any;
  msgType: any;
  isAlert = false;
  isSuccess = false;

  constructor(
    private fB: FormBuilder,
    private aS: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private pS: ProductService
  ) {
    this.loginForm = this.fB.group({
      email: [null, [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      password: [null, [Validators.required]]
    });
    this.registerForm = this.fB.group({
      // first_name: [null],
      // last_name: [null],
      phone_number: [null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      password1: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
      ])
      ]
      ,
      password2: [null, [Validators.required]]
    },
      { validator: CustomValidators.passwordMatchValidator },
    );

  }

  ngOnInit() {
    if (this.router.url !== '/login') {
      this.route.params.subscribe(params => this.onVerify(params['key']));
    }
  }

  get loginError() {
    return this.loginForm.controls;
  }

  get registerError() {
    return this.registerForm.controls;
  }

  onVerify(key: string) {
    this.aS.verifyEmail(key).subscribe((res: any) => {
    });
  }

  onLogin() {
    this.isSubmitLogin = true;
    const loginValue = this.loginForm.value;
    this.aS.login(loginValue).subscribe({
      next: (res: any) => {
        if (res.status_code == 200) {
          localStorage.setItem('authLogedin', JSON.stringify(res.info));
          this.router.navigate(['']);
          this.pS.cartItemUser()
        }
      },
      error: (err: any) => {
        this.msg = err.error.message;
        this.msgType = 'danger';
        this.isAlert = true;
      }
    }
    );

  }

  changeTab(i: boolean) {
    this.isLogin = i;
  }

  onRegister() {
    this.isSubmitRegister = true;
    const registerValue = this.registerForm.value;
    this.aS.registerAccount(registerValue).subscribe((res: any) => {

      if (res.status_code == 201) {
        this.isSuccess = true;
        // localStorage.setItem('authLogedin', JSON.stringify(res.info));
        // this.router.navigate([''])
      } else {
        this.msgType = 'danger';
        this.msg = 'asdasdasdas';
        this.isAlert = true;

      }
    });
  }

  // getIsChecked() {
  //   this.isChecked = !this.isChecked
  // }



}
