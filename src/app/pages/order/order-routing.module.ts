import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/order/list-purchase-order',
				pathMatch: 'full'
      },
      {
        path: 'list-purchase-order',
        component: ListPurchaseOrderComponent
      },
      {
        path: 'create-purchase-order',
        component: CreatePurchaseOrderComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
