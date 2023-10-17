import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { PaymentApplicationComponent } from './payment-application/payment-application.component';
import { PremiumCalculationComponent } from './premium-calculation/premium-calculation.component';


@NgModule({
  declarations: [
    PaymentApplicationComponent,
    PremiumCalculationComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule
  ]
})
export class InsuranceModule { }
