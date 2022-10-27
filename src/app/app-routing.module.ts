import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsDtlsComponent } from './pages/products/products-dtls/products-dtls.component';
import { ProductsComponent } from './pages/products/products/products.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';
HomeComponent

const routes: Routes = [
  
   
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'products/product-details',
        component: ProductsDtlsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/change-password',
        component: EditProfileComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password/:uid/:token',
        component: ForgotPasswordComponent
      },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabledBlocking',
    scrollOffset: [0, 0],
    onSameUrlNavigation: 'reload' 
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
