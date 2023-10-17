import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sold-to',
  templateUrl: './sold-to.component.html',
  styleUrls: ['./sold-to.component.scss']
})
export class SoldToComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton;

  subscription: Subscription;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit() {
  }
  
  saveSoldTo() {
    let data = this.soldToForm.value;
    this.invoiceService.addSoldTo(data)
    .subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }

      this.invoiceService.soldToList.splice(0, 0, result.payload);
      this.closebutton.nativeElement.click();
      Swal.fire('Success', 'Record saved successfully!', 'success');
    });
  }

  public soldToForm: FormGroup = this.fb.group({
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
    return this.soldToForm.get('code');
  }

  public get mobile() {
    return this.soldToForm.get('mobile');
  }

  public get name() {
    return this.soldToForm.get('name');
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
