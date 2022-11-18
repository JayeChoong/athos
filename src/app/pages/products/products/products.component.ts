import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isFilter = false;
  isSearch = false;
  catList: any[] = [];
  prdList: any[] = [];
  allPrdList: any[] = [];
  declare searchForm: FormGroup;
  path = environment.base;
  sortList: any[] = [{ value: 'Most Viewed', id: 1 }, { value: 'Newest', id: 2 }, { value: 'Price:High to Low', id: 3 }, { value: 'Price:Low to High', id: 4 }]
  sizeList: any[] = [
    { name: 'XS' }, { name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' }]

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
    this.catList = this.pS.catList;
    this.getPrdList();
  }

  getPrdList(params: any = {}) {
    this.pS.getPrdList(params).subscribe((res: any) => {
      if (res.status_code == 200) {
        this.allPrdList = res.info.results;
        this.prdList = this.allPrdList;
      }
    });
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
    this.router.navigate(['/products/product-details/' + itm.id])
  }

  updateUrl(evt: any, prd: any) {
    if (evt.type === 'error') {
      prd.product_images[0] = this.path + prd.product_images[0];
    }
  }

  searchPrd(evt: any) {
    const keyword = (evt.target.value).toString().toLowerCase();
    this.prdList = this.allPrdList.filter(itm => itm.title.toString().toLowerCase().includes(keyword));
  }

  onSelectCat(evt: any) {
    if (evt.id === 'all') {
      this.prdList = this.allPrdList;
    } else {
      this.prdList = this.allPrdList.filter(itm => itm.category === evt.id);
    }
  }

  onSelectSort(evt: any) {
    let params: any = {}
    // if (evt.value === '-1') {
    //   this.getPrdList();
    // }
    if (evt.value === '1') {
      params['ordering'] = '-views';
    }
    if (evt.value === '2') {
      params['ordering'] = '-created';
    }
    if (evt.value === '3') {
      params['ordering'] = '-price';
    }
    if (evt.value === '4') {
      params['ordering'] = 'price';
    }
    this.getPrdList(params);
  }

  changeSize(itm: any) {
    // this.sizeList.map(it => it.active = false);
    itm.active = !itm.active;
  }

}
