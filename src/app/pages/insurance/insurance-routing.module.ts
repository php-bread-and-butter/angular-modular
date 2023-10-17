import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentApplicationComponent } from './payment-application/payment-application.component';
import { PremiumCalculationComponent } from './premium-calculation/premium-calculation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/insurance/payment-application',
				pathMatch: 'full'
      },
      {
        path: 'payment-application',
        component: PaymentApplicationComponent
      },
      {
        path: 'premium-calculation',
        component: PremiumCalculationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
