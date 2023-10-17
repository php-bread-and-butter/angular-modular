import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.scss'],
  providers: [
    NgbInputDatepickerConfig,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ] // add config to the component providers
})
export class CreatePurchaseOrderComponent implements OnInit {
  date = new FormControl(moment([2017, 0, 1]));

  model: NgbDateStruct;
  
  constructor(config: NgbInputDatepickerConfig, calendar: NgbCalendar) {
    // customize default values of datepickers used by this component tree
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    
    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';
    config.navigation = 'select';
    
    // weekends are disabled
    config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
    
    // setting datepicker popup to close only on click outside
    config.autoClose = true;
    
    // setting datepicker popup to open above the input
    config.placement = ['bottom-left', 'bottom-right'];
  }
  
  ngOnInit(): void {
  }
  
}
