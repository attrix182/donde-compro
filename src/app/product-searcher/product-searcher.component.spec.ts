import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearcherComponent } from './product-searcher.component';

describe('ProductSearcherComponent', () => {
  let component: ProductSearcherComponent;
  let fixture: ComponentFixture<ProductSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSearcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
