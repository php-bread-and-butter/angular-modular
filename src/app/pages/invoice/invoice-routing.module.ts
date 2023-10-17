import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIndentComponent } from './indent/create-indent/create-indent.component';
import { ListIndentComponent } from './indent/list-indent/list-indent.component';
import { CreateProformaComponent } from './proforma/create-proforma/create-proforma.component';
import { ListProformaComponent } from './proforma/list-proforma/list-proforma.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/invoice/list-indent-invoice',
				pathMatch: 'full'
      },
      {
        path: 'list-indent-invoice',
        component: ListIndentComponent
      },
      {
        path: 'create-indent-invoice',
        component: CreateIndentComponent
      },
      {
        path: 'list-proforma-invoice',
        component: ListProformaComponent
      },
      {
        path: 'create-proforma-invoice',
        component: CreateProformaComponent
      },
      {
        path: 'edit-proforma-invoice/:proformaInvoiceNo',
        component: CreateProformaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
