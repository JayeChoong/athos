import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products/products.component';
import { LoginComponent } from './login/login.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { CartComponent } from './cart/cart.component';
// import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
  
    // CartComponent,
      //  ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TabsModule,

    ],
})
export class PagesModule {}
