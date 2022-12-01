import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeaderInterceptor } from '../interceptors/header.interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = environment.path;
  basePath = environment.base;
  usrDtls: any;

  constructor(
    private http: HttpClient

  ) { }

  get isLogedin() {
    const authStored = localStorage.getItem('authLogedin') || ""
    return authStored ? JSON.parse(authStored) : null
  }

  registerAccount(value: any) {
    const body = {
      email: value.email,
      password1: value.password1,
      password2: value.password2,
      phone_number: value.phone_number
      // first_name: value.first_name,
      // last_name: value.last_name
    }
    return this.http.post(this.path + `/rest-auth/registration/`, body);


  }

  login(value: any) {
    const body = {
      email: value.email,
      password: value.password,
    }
    return this.http.post(this.path + `/rest-auth/login/`, body);
  }

  getUsrDtls() {
    return this.http.get(this.path + `/rest-auth/user/`)
  }

  logout() {
    return this.http.post(this.path + `/rest-auth/logout/`, {})
  }

  changePwd(value: any) {
    const body = {
      new_password1: value.password1,
      new_password2: value.password2
    }
    return this.http.post(this.path + `/rest-auth/password/change/`, body)
  }

  updateUsrDtls(value: any) {
    console.log(value);
    const body = {
      first_name: value.first_name,
      last_name: value.last_name,
      phone_number: value.phone_number,
      home_address: value.home_address,
      delivery_address: value.delivery_address
    }
    return this.http.put(this.path + `/rest-auth/user/`, body)
  }

  resetPwd(value: any) {
    const body = {
      email: value.email,
    }
    return this.http.post(this.path + `/rest-auth/password/reset/`, body)
  }

  updatePwd(value: any, auth: any) {
    const body = {
      new_password1: value.password1,
      new_password2: value.password2,
      uid: auth.uid,
      token: auth.token
    }
    return this.http.post(this.path + `/rest-auth/password/reset/confirm/`, body)
  }

  verifyEmail(key: any) {
    const body = {
      key: key,
    }
    return this.http.post(this.path + `/rest-auth/verify-email/`, body)

  }

  updateUrl(evt: any, itm: any) {
    if (evt.type === 'error') {
      evt.target.src = this.basePath + itm;
      // evt.target.src = './assets/about-attitude.png';
    }
  }
  }


