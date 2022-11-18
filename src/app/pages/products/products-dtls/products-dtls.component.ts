import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-products-dtls',
  templateUrl: './products-dtls.component.html',
  styleUrls: ['./products-dtls.component.scss']
})
export class ProductsDtlsComponent implements OnInit {
  carouselImg: any;
  errorImg = "./assets/about.png";
  prdId: any;
  slide: any;
  prdDtls: any;
  catList: any[] = [];
  viewList: any[] = [];
  sizeList: any[] = [
    { name: 'XXS' }, { name: 'XS' }, { name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' }, { name: 'XXL' }]
  colorList: any[] = []
  path = environment.base;
  selectedColor: any;
  selectedSize: any;
  isSelected = false;
  carouselList: any[] = [];
  isNew = true;
  modalRef?: BsModalRef;

  constructor(
    public pS: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private aS: AuthService,
    private modalService: BsModalService
  ) {
    this.catList = this.pS.catList;
  }

  ngOnInit(): void {
    this.prdId = this.route.snapshot.params['id'];
    this.viewList = this.pS.viewList.filter(itm => itm.id != this.prdId);
    const w = window.innerWidth;
    if (w > 1250) {
      this.slide = 4;
    } else if (w <= 1250) {
      this.slide = 1;
    };
    this.pS.getPrdDtls(this.prdId).subscribe(async (res: any) => {
      if (res.status_code == 200) {
        this.prdDtls = await res.info;
        this.carouselImg = await this.path + this.prdDtls.product_variants[0].product_variant_images[0];
        for (const it of this.prdDtls.product_variants[0].product_variant_images) {
          const img = await this.path + it;
          this.carouselList.push(img);
        }
        this.pS.selectedPrd = this.prdDtls;
        let isExist = false;
        for (const view of this.pS.viewList) {
          if (view.id == this.prdDtls.id) {
            isExist = true;
          }
        }
        if (!isExist) {
          this.pS.viewList.push(this.prdDtls);
        }
        this.patchPrdVariant();
      }
    });
  }

  patchPrdVariant() {
    this.prdDtls.product_variants.map((itm: any) => {
      const variant: any = {}
      itm.product_variant_values.forEach((item: any) => {
        variant[item['name']] = item['value'];
      });
      itm = Object.assign(itm, variant);
      itm.images = [];
      for (const it of itm.product_variant_images) {
        const img = this.path + it;
        itm.images.push(img);
      }
      this.colorList.push({ color: itm.COLOR, product_variant_images: itm.images });
    });
    this.selectedColor = this.colorList[0].color;
    this.colorList = [... new Map(this.colorList.map((a) => [a.color, a])).values()];
    this.patchSize();
  }

  patchSize() {
    this.prdDtls.product_variants.forEach((itm: any) => {
      this.colorList.forEach((obj: any) => {
        if (itm.COLOR === obj.color) {
          if (obj.variants) {
            obj.variants.push({ id: itm.id, size: itm.SIZE, qty: itm.quantity });
          } else {
            obj.variants = [];
            obj.variants.push({ id: itm.id, size: itm.SIZE, qty: itm.quantity });
          }
        }
        if (obj.color === this.selectedColor) {
          for (const it of obj.variants) {
            this.sizeList.map((i: any) => {
              if (it.size === i.name && it.qty !== 0) {
                i.available = true;
                i.id = it.id
              }
            })
          }
        }
      })
    })
  }

  updateUrl(evt: any, itm?: any) {
    console.log(itm);
    if (evt.type === 'error') {
      if (itm) {
        itm.product_images[0] = this.path + itm.product_images[0];
      } else {
        this.prdDtls.product_images[0] = this.path + this.prdDtls.product_images[0];
      }
    }
  }

  addCart() {
    if (!this.selectedSize || !this.selectedColor) {
      this.isSelected = false;
      this.isNew = false;
    } else {
      
      let product = {
        id: Number(this.prdId),
        title: this.prdDtls.title,
        quantity: this.prdDtls.quantity,
      }
      let selected_variant = {
        COLOR: this.selectedColor,
        SIZE: this.selectedSize.name,
        product_variant_images: this.carouselList,
        id: this.selectedSize.id,
        price: Number(this.prdDtls.price),
      }

      let cart = {
        product,
        selected_variant,
        quantity: 1,
      };

      if (this.aS.isLogedin) {
        this.pS.addToCart(cart).subscribe((res: any) => {
          if (res.status_code == 201) {
            this.pushToCart(cart);
          }
        });
      } else {
      this.pushToCart(cart);
      }
    }
  }

  pushToCart(itm: any) {
    let isExist = false;
    for (const cart of this.pS.cartList) {
      if (cart.selected_variant.id == itm.selected_variant.id) {
        cart.quantity = cart.quantity + 1;
        isExist = true;
      }
    }
    if (!isExist) {
      this.pS.cartList.push(itm);
    }
  }

  getPrdDtls(itm: any) {
    this.pS.selectedPrd = itm;
    this.router.navigate(['/products/product-details'])
  }

  changeSize(itm: any) {
    if (itm.available) {
      this.sizeList.map(it => it.active = false);
      itm.active = true;
      this.selectedSize = itm;
      this.isSelected = true;
      this.isNew = false;
    }

  }

  changeImg(img: any) {
    this.carouselImg = img;
  }

  changeColor(itm: any) {
    this.carouselImg = itm.product_variant_images[0];
    this.carouselList = itm.product_variant_images;
    this.selectedColor = itm.color;
    this.sizeList.map(it => it.active = false);
    this.selectedSize = null;
    this.isSelected = false;
    this.isNew = true;
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content, 
      Object.assign({}, { class: 'modal-lg' }));
  }

}
