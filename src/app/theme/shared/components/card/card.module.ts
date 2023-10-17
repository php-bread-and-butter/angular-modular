import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [CardComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPopoverModule
  ]
})
export class CardModule { }
