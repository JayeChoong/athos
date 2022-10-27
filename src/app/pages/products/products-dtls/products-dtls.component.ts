import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-dtls',
  templateUrl: './products-dtls.component.html',
  styleUrls: ['./products-dtls.component.scss']
})
export class ProductsDtlsComponent implements OnInit {
  carouselImg = this.pS.selectedPrd.product_images[0];
  slide: any;
  // catList: any[] = [];
  viewList: any[] = [];
  sizeList: any[] = [{name:'XS'},{name:'S'}, {name:'M'}, {name:'L'}, {name:'XL'} ]
  colorList: any[] = [   
  {image: './assets/about.png'},
  {image: './assets/about-vision.png'},
  {image: './assets/about-mision.png'},
  {image: './assets/about.png'},
  {image: './assets/about-vision.png'},
  {image: './assets/about-mision.png'},]


  constructor(
    public pS: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const w = window.innerWidth;
    if (w > 1250) {
      this.slide = 4;
    } else if (w <= 1250) {
      this.slide = 1;
    };
    
    // this.pS.getCatList(this);
    this.viewList = this.pS.viewList.filter(itm => itm.id !== this.pS.selectedPrd.id)
 
  }

  updateUrl(evt: any, itm?: any) {
    if (evt.type === 'error') {
      this.pS.selectedPrd.image = "./assets/about.png";
      itm.image = "./assets/about.png"
    }
  }

  addCart() {
    this.pS.cartList.push(this.pS.selectedPrd);
    console.log(this.pS.cartList);
  }

  getPrdDtls(itm: any) {
    this.pS.selectedPrd = itm;
    this.router.navigate(['/products/product-details'])
  }

  changeSize(itm:any) {
    this.sizeList.map(it=> it.active = false);
    itm.active = true;
  }

  changeImg(img: any) {
this.carouselImg = img;
  }

}
