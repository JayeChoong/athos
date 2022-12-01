import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'athos-website';

  constructor(
    public pS: ProductService
  ) { }

  ngOnInit(): void {
    if (this.pS.catList.length == 0) {
      this.pS.getCatList()
    }
    if (this.pS.sizeList.length == 0) {
      this.pS.getSizeList()
    }
    if (this.pS.colorList.length == 0) {
      this.pS.getColorList()
    }
  }
}
