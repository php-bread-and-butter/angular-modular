import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {
  @ViewChild('closebutton') closebutton;
  
  @ViewChild('contactPersonName') cpNameInput : ElementRef;
  @ViewChild('contactPersonMobile') cpMobileInput : ElementRef;
  @ViewChild('contactPersonEmail') cpEmailInput : ElementRef;
  
  active = 1;
  contactPerson = [];
  
  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}
  
  public agentForm: FormGroup = this.fb.group({
    "companyID": [],
    "shortName": ['', Validators.required],
    "email": ['', Validators.required],
    "altEmail": [],
    "companyName": ['', [
      Validators.required,
      Validators.minLength(3),
    ]],
    "whatsappNo": [],
    "skypeID": [],
    "phone": [],
    "fax": [],
    "facebookID": [],
    "website": [],
    "mobile": ['', Validators.required],
    "altMobile": [],
    "bHouse": ['', Validators.required],
    "bRoad": [],
    "bSector": [],
    "bThana": ['', Validators.required],
    "bCity": [],
    "bDistrict": ['', Validators.required],
    "bPostCode": ['', Validators.required],
    "bCountry": ['', Validators.required],
    "sHouse": ['', Validators.required],
    "sRoad": [],
    "sSector": [],
    "sThana": ['', Validators.required],
    "sCity": [],
    "sDistrict": ['', Validators.required],
    "sPostCode": ['', Validators.required],
    "sCountry": ['', Validators.required],
    "contactPerson": this.fb.array([
      this.createContact()
    ]),
    "agentType": ['indent']
  });
  
  createContact(): FormGroup {
    return this.fb.group({
      "cpName": ['', Validators.required],
      "cpMobile": ['', Validators.required],
      "cpEmail": ['', Validators.required],
      "cpAddress": [],
      "cpNID": [],
      "cpDesignation": [],
    });
  }
  
  saveAgent() {
    let data = this.agentForm.value;
    this.invoiceService.addNewAgent(data)
    .subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }
      this.invoiceService.agentList.splice(0, 0, result.payload);
      this.closebutton.nativeElement.click();
      Swal.fire('Success', 'Record saved successfully!', 'success');
    });
  }
  
  addContactPerson() {
    if(this.cpName.invalid) {
      this.cpNameInput.nativeElement.focus();
      this.cpNameInput.nativeElement.blur();
      return;
    }
    if(this.cpMobile.invalid) {
      this.cpMobileInput.nativeElement.focus();
      this.cpMobileInput.nativeElement.blur();
      return;
    }
    if(this.cpEmail.invalid) {
      this.cpEmailInput.nativeElement.focus();
      this.cpEmailInput.nativeElement.blur();
      return;
    }
    
    let cp = {
      "cpName": this.cpName.value,
      "cpMobile": this.cpMobile.value,
      "cpEmail": this.cpEmail.value,
      "cpAddress": this.cpAddress.value,
      "cpNID": this.cpNID.value,
      "cpDesignation": this.cpDesignation.value
    }
    this.contactPerson.push(cp);
    this.agentForm.value.contactPerson = this.contactPerson;
  }
  
  removeContactPerson(cp) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let index = this.contactPerson.indexOf(cp);
        this.contactPerson.splice(index, 1);
        this.agentForm.value.contactPerson = this.contactPerson;
        
        Swal.fire('Deleted!', 'Record has been deleted.', 'success')
      }
    });     
  }

  billingShippingSame(target) {
    if (target.currentTarget.checked) {
      this.sHouse.setValue(this.bHouse.value);
      this.sRoad.setValue(this.bRoad.value);
      this.sThana.setValue(this.bThana.value);
      this.sDistrict.setValue(this.bDistrict.value);
      this.sCountry.setValue(this.bCountry.value);
      this.sSector.setValue(this.bSector.value);
      this.sCity.setValue(this.bCity.value);
      this.sPostCode.setValue(this.bPostCode.value);
    } else {
      this.sHouse.setValue('');
      this.sRoad.setValue('');
      this.sThana.setValue('');
      this.sDistrict.setValue('');
      this.sCountry.setValue('');
      this.sSector.setValue('');
      this.sCity.setValue('');
      this.sPostCode.setValue('');
    }
  }
  
  public get shortName() {
    return this.agentForm.get('shortName');
  }
  
  public get email() {
    return this.agentForm.get('email');
  }
  
  public get companyName() {
    return this.agentForm.get('companyName');
  }
  
  public get mobile() {
    return this.agentForm.get('mobile');
  }
  
  public get bHouse() {
    return this.agentForm.get('bHouse');
  }
  
  public get bRoad() {
    return this.agentForm.get('bRoad');
  }
  
  public get bThana() {
    return this.agentForm.get('bThana');
  }
  
  public get bDistrict() {
    return this.agentForm.get('bDistrict');
  }
  
  public get bPostCode() {
    return this.agentForm.get('bPostCode');
  }
  
  public get bCountry() {
    return this.agentForm.get('bCountry');
  }
  
  public get bSector() {
    return this.agentForm.get('bSector');
  }
  
  public get bCity() {
    return this.agentForm.get('bCity');
  }
  
  public get sHouse() {
    return this.agentForm.get('sHouse');
  }
  
  public get sRoad() {
    return this.agentForm.get('sRoad');
  }
  
  public get sThana() {
    return this.agentForm.get('sThana');
  }
  
  public get sDistrict() {
    return this.agentForm.get('sDistrict');
  }
  
  public get sPostCode() {
    return this.agentForm.get('sPostCode');
  }
  
  public get sCountry() {
    return this.agentForm.get('sCountry');
  }
  
  public get sSector() {
    return this.agentForm.get('sSector');
  }
  
  public get sCity() {
    return this.agentForm.get('sCity');
  }
  
  public get cpName() {
    return ((this.agentForm.get('contactPerson') as FormArray).controls[0] as FormGroup).controls.cpName;
  }
  
  public get cpMobile() {
    return ((this.agentForm.get('contactPerson') as FormArray).controls[0] as FormGroup).controls.cpMobile;
  }
  
  public get cpEmail() {
    return ((this.agentForm.get('contactPerson') as FormArray).controls[0] as FormGroup).controls.cpEmail;
  }
  
  public get cpAddress() {
    return ((this.agentForm.get('contactPerson') as FormArray).controls[0] as FormGroup).controls.cpAddress;
  }
  
  public get cpNID() {
    return ((this.agentForm.get('contactPerson') as FormArray).controls[0] as FormGroup).controls.cpNID;
  }
  
  public get cpDesignation() {
    return ((this.agentForm.get('contactPerson') as FormArray).controls[0] as FormGroup).controls.cpDesignation;
  }
  
  public get ContactPerson() {
    return this.contactPerson;
  }
}
