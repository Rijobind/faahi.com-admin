import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyOrderGoal } from './monthly-order-goal';

describe('MonthlyOrderGoal', () => {
  let component: MonthlyOrderGoal;
  let fixture: ComponentFixture<MonthlyOrderGoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyOrderGoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyOrderGoal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
