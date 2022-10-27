import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


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

  constructor(
    private fB: FormBuilder,
    private aS: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fB.group({
      email: [null, [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      password: [null, [Validators.required]]
    });
    this.registerForm = this.fB.group({
      first_name: [null],
      last_name: [null],
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

  }

  get loginError() {
    return this.loginForm.controls;
  }

  get registerError() {
    return this.registerForm.controls;
  }

  onLogin() {
    this.isSubmitLogin = true;
    const loginValue = this.loginForm.value;
    this.aS.login(loginValue).subscribe((res: any) => {
      localStorage.setItem('authLogedin', JSON.stringify(res));
      this.router.navigate([''])
    });

  }

  changeTab(i: boolean) {
    this.isLogin = i;
  }

  onRegister() {
    this.isSubmitRegister = true;
    const registerValue = this.registerForm.value;
    this.aS.registerAccount(registerValue).subscribe((res: any) => {
      if (res.access_token) {
        localStorage.setItem('authLogedin', JSON.stringify(res));
        this.router.navigate([''])
      } else {
        this.msgType = 'danger';
        this.msg = res.non_field_errors[0];
        this.isAlert = true;
      }
    });
  }

  // getIsChecked() {
  //   this.isChecked = !this.isChecked
  // }



}
