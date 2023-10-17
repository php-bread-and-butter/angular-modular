import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton;

  subscription: Subscription;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit() {
  }
  
  saveLedger() {
    let data = this.ledgerForm.value;
    this.invoiceService.addLedger(data)
    .subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }

      this.invoiceService.ledgerList.splice(0, 0, result.payload);
      this.closebutton.nativeElement.click();
      Swal.fire('Success', 'Record saved successfully!', 'success');
    });
  }

  public ledgerForm: FormGroup = this.fb.group({
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
    return this.ledgerForm.get('code');
  }

  public get mobile() {
    return this.ledgerForm.get('mobile');
  }

  public get name() {
    return this.ledgerForm.get('name');
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
