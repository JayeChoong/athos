import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDtlsComponent } from './products-dtls.component';

describe('ProductsDtlsComponent', () => {
  let component: ProductsDtlsComponent;
  let fixture: ComponentFixture<ProductsDtlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDtlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
