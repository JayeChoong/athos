import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from './pages/home/home.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProductsComponent } from './pages/products/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsDtlsComponent } from './pages/products/products-dtls/products-dtls.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HttpInterceptorProviders } from './interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsDtlsComponent,
    ProductsComponent,
    LoginComponent,
    CartComponent,
    ProfileComponent,
    EditProfileComponent,
    ForgotPasswordComponent,
    CatalogueComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    TabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    BrowserAnimationsModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    HttpInterceptorProviders
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HeaderInterceptor,
    //   multi: true
    // },
    // HeaderInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
