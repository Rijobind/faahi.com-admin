import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellingProducts } from './top-selling-products';

describe('TopSellingProducts', () => {
  let component: TopSellingProducts;
  let fixture: ComponentFixture<TopSellingProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSellingProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSellingProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
