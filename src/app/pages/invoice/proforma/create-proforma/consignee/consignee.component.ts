import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-consignee',
  templateUrl: './consignee.component.html',
  styleUrls: ['./consignee.component.scss']
})
export class ConsigneeComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton;

  active = 1;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit() {
  }
  
  saveConsignee() {
    let data = this.consigneeForm.value;
    this.invoiceService.addConsignee(data)
    .subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }

      this.invoiceService.consigneeList.splice(0, 0, result.payload);
      this.closebutton.nativeElement.click();
      Swal.fire('Success', 'Record saved successfully!', 'success');
    });
  }

  public consigneeForm: FormGroup = this.fb.group({
    "code": ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(3),
    ]],
    "house": [],
    "upazila": [],
    "binval": [],
    "mobile": ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11)
    ]],
    "email": [],
    "name": ['', Validators.required],
    "road": [],
    "sector": [],
    "district": [],
    "etin": [],
    "nid": [],
    "vatReg": []
  });

  public get code() {
    return this.consigneeForm.get('code');
  }

  public get mobile() {
    return this.consigneeForm.get('mobile');
  }

  public get name() {
    return this.consigneeForm.get('name');
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
