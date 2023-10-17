import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';

@NgModule({
  declarations: [
    CreatePurchaseOrderComponent,
    ListPurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
