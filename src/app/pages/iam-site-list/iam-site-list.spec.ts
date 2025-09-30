import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IamSiteList } from './iam-site-list';

describe('IamSiteList', () => {
  let component: IamSiteList;
  let fixture: ComponentFixture<IamSiteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IamSiteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IamSiteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
