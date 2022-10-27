import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isFilter = false;
  isSearch = false;
  // catList: any[] = th;
  prdList: any[] = [];
  allPrdList: any[] =[];
  declare searchForm: FormGroup;
  sortList: any[] = [{value:'Newest', id: 1}, {value:'High to Low', id:2}, , {value:'Low to High', id:3}]

  constructor(
    public pS: ProductService,
    private router: Router,
    private fB: FormBuilder
  ) {
    this.searchForm = this.fB.group({
      keyword: [null]
    })
   }

  ngOnInit(): void {
    this.pS.getPrdList().subscribe((res: any) => {
      this.prdList = res.results;
      this.allPrdList = res.results;
    });
    // this.pS.getCatList(this);

  }

  filterPrds(i: any) {
    if (i === 'F') {
      this.isSearch = false;
      this.isFilter = !this.isFilter;
    }
    if (i === 'S') {
      this.isFilter = false;
      this.isSearch = !this.isSearch;
    }
  }

  getPrdDtls(itm: any) {
    this.pS.selectedPrd = itm;
    this.pS.viewList.push(this.pS.selectedPrd);
    this.router.navigate(['/products/product-details'])
  }

  updateUrl(evt: any, prd:any) {
    if (evt.type === 'error') {
      prd.product_images[0] = "./assets/about.png";
    }
  }

  searchPrd(evt:any) {
    const keyword = (evt.target.value).toString().toLowerCase();
    this.prdList = this.allPrdList.filter(itm => itm.title.toString().toLowerCase().includes(keyword));
  }

  onSelectCat(evt:any) {
    if (evt.id === 'all') {
     this.prdList = this.allPrdList;
    } else {
      this.prdList = this.allPrdList.filter(itm => itm.category === evt.id);
    }
  }

}
