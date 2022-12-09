import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  declare resetForm: FormGroup;
  declare updateForm: FormGroup
  isSubmitReset = false;
  isSubmitUpdate = false;
  isSuccess = false;
  msg: any;
  msgType: any;
  isAlert = false;

  constructor(
    public router: Router,
    private fB: FormBuilder,
    private aS: AuthService,
    private route: ActivatedRoute,

  ) {
    this.resetForm = this.fB.group({
      email: [null, [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
    });

    this.updateForm = this.fB.group({
      password1: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
      ])
      ],
      password2: [null, [Validators.required]]
    },
      { validator: CustomValidators.passwordMatchValidator },
    );

   }
  ngOnInit(): void {
  }

  get resetError() {
    return this.resetForm.controls;
  }
  get updateError() {
    return this.updateForm.controls;
  }

  onReset() {
    this.isSubmitReset  = true;
    this.isAlert = false;
    const resetValue = this.resetForm.value;
    this.aS.resetPwd(resetValue).subscribe({
      next:(res: any) => {
      if (res.status_code == 200) {
        this.isSuccess = true;
        this.msg = res.message;
      }
    },
    error: (err: any) => {
      this.msg = err.error.message;
      this.msgType = 'danger';
      this.isAlert = true;
    }});
  }

  onUpdate() {
    this.isAlert = false;
    let auth;
    this.route.params.subscribe(params => auth = params);
    const updateValue = this.updateForm.value;
    this.aS.updatePwd(updateValue,auth).subscribe({
      next:(res: any) => {
      if (res.status_code == 200) {
        this.isSuccess = true;
        this.msg = res.message;
      }
    },
    error: (err: any) => {
      this.msg = err.error.message;
      this.msgType = 'danger';
      this.isAlert = true;
    }});
  }

}
