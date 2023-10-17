import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardModule } from './components/card/card.module';
import { BreadcrumbModule } from './components/breadcrumb/breadcrumb.module';
import { ModalModule } from './components/modal/modal.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    DataTablesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SpinnerComponent,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    DataTablesModule
  ],
  declarations: [
    SpinnerComponent,
    SpinnerComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
