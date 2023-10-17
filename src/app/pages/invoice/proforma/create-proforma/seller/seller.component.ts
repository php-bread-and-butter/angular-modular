import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton;
  
  active = 1;
  subscription: Subscription;
  
  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.getSupplierType();
    this.getBusinessCategory();
    this.getDivision();
    this.getDistrict();
    this.getCountry();
    this.getBankName();
    this.getDocumentType();
  }
  
  saveSeller() {
    let data = this.sellerForm.value;
    this.invoiceService.addSupplier(data)
    .subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }
      this.invoiceService.supplierList.splice(0, 0, result.payload);
      this.closebutton.nativeElement.click();
      Swal.fire('Success', 'Record saved successfully!', 'success');
    });
  }

  getSupplierType() {
    // this.subscription = this.invoiceService.getNewAgent().subscribe((res: any)=> {
    //   this.invoiceService.supplierTypeList = res.payload;
    // });
  }

  getBusinessCategory() {
    // this.subscription = this.invoiceService.getNewAgent().subscribe((res: any)=> {
    //   this.invoiceService.businessCategoryList = res.payload;
    // });
  }

  getDivision() {
    this.subscription = this.invoiceService.getDivision().subscribe((res: any)=> {
      this.invoiceService.divisionList = res.payload;
    });
  }

  getDistrict() {
    this.subscription = this.invoiceService.getDistrict().subscribe((res: any)=> {
      this.invoiceService.districtList = res.payload;
    });
  }

  getState() {
    this.subscription = this.invoiceService.getState().subscribe((res: any)=> {
      this.invoiceService.stateList = res.payload;
    });
  }

  getCountry() {
    this.subscription = this.invoiceService.getCountry().subscribe((res: any)=> {
      this.invoiceService.countryList = res.payload;
    });
  }

  getBankName() {
    // this.subscription = this.invoiceService.getNewAgent().subscribe((res: any)=> {
    //   this.invoiceService.bankNameList = res.payload;
    // });
  }

  getDocumentType() {
    // this.subscription = this.invoiceService.getNewAgent().subscribe((res: any)=> {
    //   this.invoiceService.documentTypeList = res.payload;
    // });
  }

  public sellerForm: FormGroup = this.fb.group({
    "supplierCode": ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(3),
    ]],
    "supplierName": ['', Validators.required],
    "shortName": ['', Validators.required],
    "supplierNID": [],
    "supplierPassport": [],
    "supplierType": [],
    "businessCategory": [],
    "location": [],
    "productServiceDescription": [],
    "house": [],
    "road": [],
    "sector": [],
    "upazilla": [],
    "city": [],
    "zip": [],
    "district": [],
    "country": [],
    "phone": [],
    "fax": [],
    "mobile": ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11)
    ]],
    "email": [],
    "website": [],
    "cperson": [],
    "position": [],
    "accName": ['', Validators.required],
    "accNumber": ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
    "bankName": ['', Validators.required],
    "sbranchName": ['', Validators.required],
    "routing": [],
    "swiftCode": [],
    "vatRegNo": [],
    "binNo": [],
    "eTin": [],
    "tds": [],
    "docCode": [],
    "reference": [],
    "docType": []
  });
  
  public get supplierCode() {
    return this.sellerForm.get('supplierCode');
  }
  
  public get supplierName() {
    return this.sellerForm.get('supplierName');
  }
  
  public get shortName() {
    return this.sellerForm.get('shortName');
  }
  
  public get mobile() {
    return this.sellerForm.get('mobile');
  }
  
  public get accName() {
    return this.sellerForm.get('accName');
  }
  
  public get accNumber() {
    return this.sellerForm.get('accNumber');
  }
  
  public get bankName() {
    return this.sellerForm.get('bankName');
  }
  
  public get sbranchName() {
    return this.sellerForm.get('sbranchName');
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
