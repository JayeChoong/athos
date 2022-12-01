import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
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
  sizeList: any[] = []
  filterList: any[] = [];
  sortBy: any;
  colorList: any[] = []
  priceList: any[] = [
    { name: 'less than RM100', min: 0, max: 100 },
    { name: 'RM100 - RM200', min: 100, max: 200 },
    { name: 'RM200 - RM300', min: 200, max: 300 },
    { name: 'RM300 - RM400', min: 300, max: 400 },
    { name: 'more than RM400', min: 400, max: 0 }]


  constructor(
    public pS: ProductService,
    private router: Router,
    private fB: FormBuilder,
    public aS: AuthService
  ) {
    this.searchForm = this.fB.group({
      keyword: [null]
    })
  }

  ngOnInit(): void {
    this.catList = this.pS.catList;
    this.sizeList = this.pS.sizeList;
    this.colorList = this.pS.colorList;
    this.getPrdList();
  }

  getPrdList(params: any = {}) {
    let filter = '?';

    if (this.sortBy == 1) {
      filter = filter + 'ordering=-views';
    } else if (this.sortBy == 2) {
      filter = filter + 'ordering=-created';
    } else if (this.sortBy == 3) {
      filter = filter + 'ordering=-price';
    } else if (this.sortBy == 4) {
      filter = filter + 'ordering=price';
    }

    this.filterList.forEach((item: any) => {
      if (item.value == 'price') {
        if (item.max !== 0) {
          const symbol = filter == '?' ? '' : '&'
          filter = filter + symbol + 'max_var_price=' + item.max;
        }
        if (item.min !== 0) {
          const symbol = filter == '?' ? '' : '&'
          filter = filter + symbol + 'min_var_price=' + item.min;
        }
      } else {
        const symbol = filter == '?' ? '' : '&'
        filter = filter + symbol + item.value + '=' + item.name;
      }
    });


    this.pS.getPrdList(filter).subscribe((res: any) => {
      if (res.status_code == 200) {
        this.allPrdList = res.info.results;
        this.prdList = this.allPrdList;
      }
    });
  }

  searchPrd(isReset = false) {
    if (isReset) {
      this.searchForm.get('keyword')?.setValue('');
    }
    let keyword = this.searchForm.value.keyword;
    this.filterList = this.filterList.filter(obj => obj.value !== 'search');
    if (keyword !== '') {
      this.filterList.push({ value: 'search', name: keyword.toString().toLowerCase(), viewValue: 'Search' })
    } 
    this.getPrdList();
  }

  getPrdDtls(itm: any) {
    this.router.navigate(['/products/product-details/' + itm.id])
  }

  onSelectCat(evt: any) {
    if (evt.id === 'all') {
      this.prdList = this.allPrdList;
    } else {
      this.prdList = this.allPrdList.filter(itm => itm.category === evt.id);
    }
  }

  onSelectSort(evt: any) {
    this.sortBy = evt.value;
    this.getPrdList();
  }

  changeFilter(itm: any, i: any) {
    itm.isActive = !itm.isActive;

    if (itm.isActive) {
      if (i == 'S') {
        this.filterList.push({ value: 'size', name: itm.name, viewValue: 'Size' })
      }
      if (i == 'CL') {
        this.filterList.push({ value: 'color', name: itm.name, viewValue: 'Color' })
      }
      if (i == 'CT') {
        this.filterList.push({ value: 'category_icontains', name: itm.name, viewValue: 'Category' })
      }
    } else {
      this.filterList = this.filterList.filter(obj => obj.name !== itm.name)
    }
    this.getPrdList();

  }

  changePrice(evt: any, itm: any) {
    this.priceList.map(obj => obj.isActive = false);
    itm.isActive = evt.checked;

    this.filterList = this.filterList.filter(obj => obj.value !== 'price');
    // this.filterList = this.filterList.filter(obj => obj.value !== 'max_var_price');

    if (evt.checked) {
      // if (itm.min != 0) {
        this.filterList.push({ value: 'price', min: itm.min, max: itm.max, viewValue: 'Price', name: itm.name})
      // }
      // if (itm.max != 0) {
      //   this.filterList.push({ value: 'max_var_price', name: itm.max })
      // }
    }

    this.getPrdList();
  }

  deleteFilter(itm: any) {
    itm.isActive = true;
    if (itm.viewValue == 'Color') {
      this.changeFilter(itm, 'CL');
      this.colorList.map(obj => {
        if (obj.name == itm.name) {
          obj.isActive = false;
        }
      })
    }
    if (itm.viewValue == 'Category') {
      this.changeFilter(itm, 'CT');
      this.catList.map(obj => {
        if (obj.name == itm.name) {
          obj.isActive = false;
        }
      })
    }
    if (itm.viewValue == 'Size') {
      this.changeFilter(itm, 'S');
      this.sizeList.map(obj => {
        if (obj.name == itm.name) {
          obj.isActive = false;
        }
      })
    }
    if (itm.viewValue == 'Search') {
      this.searchPrd(true);
    }
    if (itm.viewValue == 'Price') {
      this.changePrice({checked: false}, itm);
    }

  }



}
