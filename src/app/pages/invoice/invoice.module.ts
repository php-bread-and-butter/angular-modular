import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { ListIndentComponent } from './indent/list-indent/list-indent.component';
import { CreateIndentComponent } from './indent/create-indent/create-indent.component';
import { ListProformaComponent } from './proforma/list-proforma/list-proforma.component';
import { CreateProformaComponent } from './proforma/create-proforma/create-proforma.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AgentComponent } from './proforma/create-proforma/agent/agent.component';
import { SellerComponent } from './proforma/create-proforma/seller/seller.component';
import { BeneficiaryBankComponent } from './proforma/create-proforma/beneficiary-bank/beneficiary-bank.component';
import { SoldToComponent } from './proforma/create-proforma/sold-to/sold-to.component';
import { NotifyPartyComponent } from './proforma/create-proforma/notify-party/notify-party.component';
import { ConsigneeComponent } from './proforma/create-proforma/consignee/consignee.component';
import { LedgerComponent } from './proforma/create-proforma/ledger/ledger.component';
import { ItemEntryComponent } from './proforma/create-proforma/item-entry/item-entry.component';


@NgModule({
  declarations: [
    ListIndentComponent,
    CreateIndentComponent,
    ListProformaComponent,
    CreateProformaComponent,
    AgentComponent,
    SellerComponent,
    BeneficiaryBankComponent,
    SoldToComponent,
    NotifyPartyComponent,
    ConsigneeComponent,
    LedgerComponent,
    ItemEntryComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule
  ]
})
export class InvoiceModule { }
