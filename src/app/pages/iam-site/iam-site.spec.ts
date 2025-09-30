import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IamSite } from './iam-site';

describe('IamSite', () => {
  let component: IamSite;
  let fixture: ComponentFixture<IamSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IamSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IamSite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
