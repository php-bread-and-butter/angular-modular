import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LcRoutingModule } from './lc-routing.module';
import { ClauseComponent } from './clause/clause.component';
import { ApplicationFormComponent } from './application-form/application-form.component';


@NgModule({
  declarations: [
    ClauseComponent,
    ApplicationFormComponent
  ],
  imports: [
    CommonModule,
    LcRoutingModule
  ]
})
export class LcModule { }
