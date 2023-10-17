import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-beneficiary-bank',
  templateUrl: './beneficiary-bank.component.html',
  styleUrls: ['./beneficiary-bank.component.scss']
})
export class BeneficiaryBankComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton;

  active = 1;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit() {
  }
  
  saveBeneficiaryBank() {
    let data = this.beneficiaryBankForm.value;
    this.invoiceService.addBeneficiaryBank(data)
    .subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }

      this.invoiceService.beneficiaryBankList.splice(0, 0, result.payload);
      this.closebutton.nativeElement.click();
      Swal.fire('Success', 'Record saved successfully!', 'success');
    });
  }

  public beneficiaryBankForm: FormGroup = this.fb.group({
    "code": ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(3),
    ]],
    "house": [],
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
    "eTin": [],
    "nid": [],
    "vatReg": []
  });

  public get code() {
    return this.beneficiaryBankForm.get('code');
  }

  public get mobile() {
    return this.beneficiaryBankForm.get('mobile');
  }

  public get name() {
    return this.beneficiaryBankForm.get('name');
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
