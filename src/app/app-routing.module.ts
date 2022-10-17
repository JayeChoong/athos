import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsDtlsComponent } from './pages/products/products-dtls/products-dtls.component';
import { ProductsComponent } from './pages/products/products/products.component';
HomeComponent

const routes: Routes = [
  {
    path: '',
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
