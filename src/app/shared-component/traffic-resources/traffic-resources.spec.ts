import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficResources } from './traffic-resources';

describe('TrafficResources', () => {
  let component: TrafficResources;
  let fixture: ComponentFixture<TrafficResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficResources]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficResources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
