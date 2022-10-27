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
  isSubmitPwd = false

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
  }

  ngOnInit(): void {
  }

  get pwdError() {
    return this.pwdForm.controls
  }

  onChangePwd() {
    this.isSubmitPwd = true;
    const pwdValue = this.pwdForm.value;
    this.aS.changePwd(pwdValue).subscribe((res: any) => {
      // localStorage.setItem('authLogedin', JSON.stringify(res));
      // this.router.navigate(['/profile'])
    });

  }

}
