import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentApplicationComponent } from './payment-application.component';

describe('PaymentApplicationComponent', () => {
  let component: PaymentApplicationComponent;
  let fixture: ComponentFixture<PaymentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
