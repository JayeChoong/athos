import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-dtls',
  templateUrl: './products-dtls.component.html',
  styleUrls: ['./products-dtls.component.scss']
})
export class ProductsDtlsComponent implements OnInit {
  catList: any[] = [];

  constructor(
    public pS: ProductService
  ) { }

  ngOnInit(): void {
    this.pS.getCatList(this);

  }

  updateUrl(evt: any) {
    if (evt.type === 'error') {
      this.pS.selectedPrd.image = "./assets/about.png";
    }
  }

}
