import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-proforma',
  templateUrl: './create-proforma.component.html',
  styleUrls: ['./create-proforma.component.scss']
})
export class CreateProformaComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('goodsCategoryInput') goodsCategoryInput : ElementRef;

  date = new FormControl(moment());
  model: NgbDateStruct;
  subscription: Subscription;
  itemGoods = [];
  proformaInvoiceNo: string;
  proforma: any;
  
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    public invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.getAgent();
    this.getSupplier();
    this.getBeneficiaryBank();
    this.getSoldTo();
    this.getNotifyParty();
    this.getConsignee();
    this.getLedger();
    this.getAllFromItemEntry();

    this.proformaInvoiceNo = this.route.snapshot.paramMap.get('proformaInvoiceNo');
    if(this.proformaInvoiceNo) this.getProformaInvoice()
  }

  ngAfterViewChecked() {
    if(this.invoiceService.selectedItem)
      this.itemName.setValue(this.invoiceService.selectedItem.name);
  }
  
  saveProforma() {
    let data = this.proformaForm.value;
    this.invoiceService.insertProformaData(data)
		.subscribe((result: any) => {
      if(!result.isSuccess) {
        Swal.fire('Error', result.serviceMessage, 'error');
        return false;
      }
      Swal.fire('Success', 'Record saved successfully!', 'success');
		});
  }
  
  addItemGoods() {
    if(this.goodsCategory.invalid) {
      this.goodsCategoryInput.nativeElement.focus();
      this.goodsCategoryInput.nativeElement.blur();
      return;
    }

    let item = {
      "goodsCategory": this.goodsCategory.value,
      "itemCode": this.itemCode.value,
      "itemName": this.itemName.value,
      "quantity": this.quantity.value,
      "quantityUnit": this.quantityUnit.value,
      "unitPrice": this.unitPrice.value,
      "priceUnit": this.priceUnit.value,
      "totalPrice": this.totalPrice.value,
      "totalUnit": this.totalUnit.value,
      "fobValue": this.fobValue.value,
      "fobValueUnit": this.fobValueUnit.value,
      "oceanFreight": this.oceanFreight.value,
      "oceanFreightUnit": this.oceanFreightUnit.value,
      "goodsDesc": this.goodsDesc.value,
      "countryOfOrigin": this.countryOfOrigin.value,
      "grade": this.grade.value,
      "brand": this.brand.value,
      "subs": this.subs.value,
      "subsUnit": this.subsUnit.value,
      "reelWidth": this.reelWidth.value,
      "reelWidthUnit": this.reelWidthUnit.value,
      'coreDia': this.coreDia.value,
      'coreDiaUnit': this.coreDiaUnit.value,
      'reelDia': this.reelDia.value,
      'reelDiaUnit': this.reelDiaUnit.value,
      'reelDiaPlusMinus': this.reelDiaPlusMinus.value,
    }
    this.itemGoods.push(item);
    this.proformaForm.value.itemGoods = this.itemGoods;
  }
  
  removeItemGoods(item) {
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
        let index = this.itemGoods.indexOf(item);
        this.itemGoods.splice(index, 1);
        this.proformaForm.value.itemGoods = this.itemGoods;
        
        Swal.fire('Deleted!', 'Record has been deleted.', 'success')
      }
    });     
  }

  getProformaInvoice() {
    this.subscription = this.invoiceService.getProformaInvoice(this.proformaInvoiceNo).subscribe((res: any)=> {
      this.proforma = res.payload[0];

      this.setInputValues();
    });
  }

  getAgent() {
    this.subscription = this.invoiceService.getNewAgent().subscribe((res: any)=> {
      this.invoiceService.agentList = res.payload;
    });
  }

  getSupplier() {
    this.subscription = this.invoiceService.getSupplier().subscribe((res: any)=> {
      this.invoiceService.supplierList = res.payload;
    });
  }

  getBeneficiaryBank() {
    this.subscription = this.invoiceService.getBeneficiaryBank().subscribe((res: any)=> {
      this.invoiceService.beneficiaryBankList = res.payload;
    });
  }

  getSoldTo() {
    this.subscription = this.invoiceService.getSoldTo().subscribe((res: any)=> {
      this.invoiceService.soldToList = res.payload;
    });
  }

  getNotifyParty() {
    this.subscription = this.invoiceService.getNotifyParty().subscribe((res: any)=> {
      this.invoiceService.notifyPartyList = res.payload;
    });
  }

  getConsignee() {
    this.subscription = this.invoiceService.getConsignee().subscribe((res: any)=> {
      this.invoiceService.consigneeList = res.payload;
    });
  }

  getLedger() {
    this.subscription = this.invoiceService.getLedger().subscribe((res: any)=> {
      this.invoiceService.ledgerList = res.payload;
    });
  }
  
  getAllFromItemEntry() {
    this.subscription = this.invoiceService.getAllFromItemEntry().subscribe((res: any)=> {
      this.invoiceService.itemEntryList = res.payload
        .sort((a, b) => a.itemid < b.itemid ? -1 : a.itemid > b.itemid ? 1 : 0);

      this.invoiceService.filteredItems = this.invoiceService.itemEntryList
        .filter(data => data.parent === 0);
    });
  }
  
  public proformaForm = this.fb.group({
    'indentNo': ['', [
      Validators.required,
      Validators.minLength(3),
    ]],
    'nameOfAgent': ['', Validators.required],
    'indentRegNo': ['', Validators.required],
    'seller': ['', Validators.required],
    'indentDate': ['', Validators.required],
    'beneficiaryBank': ['', Validators.required],
    'proformaInvoiceNo': ['', Validators.required],
    'soldTo': ['', Validators.required],
    'proformaDate': ['', Validators.required],
    'notifyParty': ['', Validators.required],
    'ledger': ['', Validators.required],
    'consignee': ['', Validators.required],
    'portOfLoading': ['', Validators.required],
    'modeOfPayment': ['', Validators.required],
    'finalDesination': ['', Validators.required],
    'lcClause': ['', Validators.required],
    'toPort': ['', Validators.required],
    'fromPort': ['', Validators.required],
    'thirdPartyDoc': ['', Validators.required],
    'timeOfShipment': ['', Validators.required],
    'yourRef': ['', Validators.required],
    'modeOfShipment': ['', Validators.required],
    'remarks': ['', Validators.required],
    'packing': ['', Validators.required],
    'insurance': ['', Validators.required],
    'inspection': ['', Validators.required],
    "items": this.fb.array([
      this.createItemList()
    ]),
  });
  
  createItemList(): FormGroup {
    return this.fb.group({
      "goodsCategory": ['', Validators.required],
      "itemCode": ['', Validators.required],
      "itemName": ['', Validators.required],
      "quantity": ['', Validators.required],
      "quantityUnit": ['', Validators.required],
      "unitPrice": ['', Validators.required],
      "priceUnit": ['', Validators.required],
      "totalPrice": ['', Validators.required],
      "totalUnit": ['', Validators.required],
      "fobValue": ['', Validators.required],
      "fobValueUnit": ['', Validators.required],
      "oceanFreight": ['', Validators.required],
      "oceanFreightUnit": ['', Validators.required],
      "goodsDesc": ['', Validators.required],
      "countryOfOrigin": ['', Validators.required],
      "grade": ['', Validators.required],
      "brand": ['', Validators.required],
      "subs": ['', Validators.required],
      "subsUnit": ['', Validators.required],
      "reelWidth": ['', Validators.required],
      "reelWidthUnit": ['', Validators.required],
      'coreDia': ['', Validators.required],
      'coreDiaUnit': ['', Validators.required],
      'reelDia': ['', Validators.required],
      'reelDiaUnit': ['', Validators.required],
      'reelDiaPlusMinus': ['', Validators.required],
    });
  }

  setInputValues() {
    this.indentNo.setValue(this.proforma.indentNo);
    
    this.proformaForm.get('nameOfAgent').setValue(this.proforma.nameOfAgent);
    this.proformaForm.get('indentRegNo').setValue(this.proforma.indentRegNo);
    this.proformaForm.get('seller').setValue(this.proforma.seller);
    this.proformaForm.get('indentDate').setValue(this.proforma.indentDate);
    this.proformaForm.get('beneficiaryBank').setValue(this.proforma.beneficiaryBank);
    this.proformaForm.get('proformaInvoiceNo').setValue(this.proforma.proformaInvoiceNo);
    this.proformaForm.get('soldTo').setValue(this.proforma.soldTo);
    this.proformaForm.get('proformaDate').setValue(this.proforma.proformaDate);
    this.proformaForm.get('notifyParty').setValue(this.proforma.notifyParty);
    this.proformaForm.get('ledger').setValue(this.proforma.ledger);
    this.proformaForm.get('consignee').setValue(this.proforma.consignee);
    this.proformaForm.get('portOfLoading').setValue(this.proforma.portOfLoading);
    this.proformaForm.get('modeOfPayment').setValue(this.proforma.modeOfPayment);
    this.proformaForm.get('finalDesination').setValue(this.proforma.finalDesination);
    this.proformaForm.get('lcClause').setValue(this.proforma.lcClause);
    this.proformaForm.get('toPort').setValue(this.proforma.toPort);
    this.proformaForm.get('fromPort').setValue(this.proforma.fromPort);
    this.proformaForm.get('thirdPartyDoc').setValue(this.proforma.thirdPartyDoc);
    this.proformaForm.get('timeOfShipment').setValue(this.proforma.timeOfShipment);
    this.proformaForm.get('yourRef').setValue(this.proforma.yourRef);
    this.proformaForm.get('modeOfShipment').setValue(this.proforma.modeOfShipment);
    this.proformaForm.get('remarks').setValue(this.proforma.remarks);
    this.proformaForm.get('packing').setValue(this.proforma.packing);
    this.proformaForm.get('insurance').setValue(this.proforma.insurance);
    this.proformaForm.get('inspection').setValue(this.proforma.inspection);
  }
  
  public get indentNo() {
    return this.proformaForm.get('indentNo');
  }

  public get goodsCategory() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.goodsCategory;
  }
  public get itemCode() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.itemCode;
  }
  public get itemName() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.itemName;
  }
  public get quantity() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.quantity;
  }
  public get quantityUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.quantityUnit;
  }
  public get unitPrice() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.unitPrice;
  }
  public get priceUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.priceUnit;
  }
  public get totalPrice() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.totalPrice;
  }
  public get totalUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.totalUnit;
  }
  public get fobValue() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.fobValue;
  }
  public get fobValueUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.fobValueUnit;
  }
  public get oceanFreight() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.oceanFreight;
  }
  public get oceanFreightUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.oceanFreightUnit;
  }
  public get goodsDesc() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.goodsDesc;
  }
  public get countryOfOrigin() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.countryOfOrigin;
  }
  public get grade() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.grade;
  }
  public get brand() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.brand;
  }
  public get subs() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.subs;
  }
  public get subsUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.subsUnit;
  }
  public get reelWidth() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.reelWidth;
  }
  public get reelWidthUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.reelWidthUnit;
  }
  public get coreDia() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.coreDia;
  }
  public get coreDiaUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.coreDiaUnit;
  }
  public get reelDia() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.reelDia;
  }
  public get reelDiaUnit() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.reelDiaUnit;
  }
  public get reelDiaPlusMinus() {
    return ((this.proformaForm.get('items') as FormArray).controls[0] as FormGroup).controls.reelDiaPlusMinus;
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
