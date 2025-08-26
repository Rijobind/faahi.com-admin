import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRevenueOverview } from './sales-revenue-overview';

describe('SalesRevenueOverview', () => {
  let component: SalesRevenueOverview;
  let fixture: ComponentFixture<SalesRevenueOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRevenueOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesRevenueOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
