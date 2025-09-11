import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVerifySuccess } from './password-verify-success';

describe('PasswordVerifySuccess', () => {
  let component: PasswordVerifySuccess;
  let fixture: ComponentFixture<PasswordVerifySuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordVerifySuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordVerifySuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
