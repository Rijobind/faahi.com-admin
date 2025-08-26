import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesThisMonth } from './sales-this-month';

describe('SalesThisMonth', () => {
  let component: SalesThisMonth;
  let fixture: ComponentFixture<SalesThisMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesThisMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesThisMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
