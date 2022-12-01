import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/class/custom-validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  declare pwdForm: FormGroup;
  declare updateForm: FormGroup;
  isSubmitPwd = false;
  isSubmitUpdate = false

  constructor(
    public router: Router,
    private fB: FormBuilder,
    private aS: AuthService
  ) {
    this.pwdForm = this.fB.group({
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

    this.updateForm = this.fB.group({
      first_name: [this.aS.usrDtls.first_name],
      last_name: [this.aS.usrDtls.last_name],
      email: [this.aS.usrDtls.email],
      phone_number: [this.aS.usrDtls.phone_number, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      home_address: [this.aS.usrDtls.home_address],
      delivery_address: [this.aS.usrDtls.delivery_address]
    });
  }

  ngOnInit(): void {
  }

  get pwdError() {
    return this.pwdForm.controls
  }

  get updateError() {
    return this.updateForm.controls;
  }

  onChangePwd() {
    this.isSubmitPwd = true;
    const pwdValue = this.pwdForm.value;
    this.aS.changePwd(pwdValue).subscribe((res: any) => {
      // localStorage.setItem('authLogedin', JSON.stringify(res));
      if (res.status_code == 200) {
        this.router.navigate(['/profile'])
      }
    });

  }

  onUpdate() {
    this.isSubmitUpdate = true;
    const updateValue = this.updateForm.value;
    this.aS.updateUsrDtls(updateValue).subscribe((res: any) => {
      // localStorage.setItem('authLogedin', JSON.stringify(res));
      if (res.status_code == 200) {
        this.router.navigate(['/profile'])
      }
    });
  }

  back() {
    this.router.navigate(['/profile'])
  }

}
