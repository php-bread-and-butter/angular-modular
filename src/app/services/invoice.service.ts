import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../models/item.model';
import { DataService } from './shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends DataService {

  agentList: any[];
  supplierList: any[];
  beneficiaryBankList: any[];
  soldToList: any[];
  notifyPartyList: any[];
  consigneeList: any[];
  ledgerList: any[];
  itemEntryList: ItemModel[] = [];
  filteredItems: ItemModel[] = [];
  selectedItem: ItemModel = null;
  supplierTypeList: any[];
  businessCategoryList: any[];
  divisionList: any[];
  districtList: any[];
  stateList: any[];
  countryList: any[];
  bankNameList: any[];
  documentTypeList: any[];
  constructor(private httpClient: HttpClient, private router: Router) {
    super('/Proforma', httpClient, router);
  }

  getAllProformaInvoice() {
    this.url = `${environment.apiUrl}/proforma/getAllProformaInvoice`;
		return this.getAll();
  }

  insertProformaData(data) {
    this.url = `${environment.apiUrl}/proforma/insertProformaData`;
		return this.create(data);
  }

  getProformaInvoice(proformaInvoiceNo) {
    this.url = `${environment.apiUrl}/proforma/getProformaInvoice`;
		return this.get(proformaInvoiceNo);
  }

  deleteProforma(proformaInvoiceNo){
    this.url = `${environment.apiUrl}/proforma/deleteProforma`;
		return this.delete(proformaInvoiceNo);
  }

  addNewAgent(data) {
    this.url = `${environment.apiUrl}/indent/addNewAgent`;
		return this.create(data);
  }

  getNewAgent() {
    this.url = `${environment.apiUrl}/indent/getNewAgent`;
		return this.getAll();
  }

  addSupplier(data) {
    this.url = `${environment.apiUrl}/proforma/addSupplierInfo`;
		return this.create(data);
  }

  getSupplier() {
    this.url = `${environment.apiUrl}/proforma/fetchProformaSupplierInfo`;
		return this.getAll();
  }

  addBeneficiaryBank(data) {
    this.url = `${environment.apiUrl}/proforma/addBeneficiaryBank`;
		return this.create(data);
  }

  getBeneficiaryBank() {
    this.url = `${environment.apiUrl}/proforma/fetchBeneficiaryBank`;
		return this.getAll();
  }

  addSoldTo(data) {
    this.url = `${environment.apiUrl}/proforma/addSoldToInfo`;
		return this.create(data);
  }

  getSoldTo() {
    this.url = `${environment.apiUrl}/proforma/fetchSoldToInfo`;
		return this.getAll();
  }

  addNotifyParty(data) {
    this.url = `${environment.apiUrl}/proforma/addNotifyParty2Info`;
		return this.create(data);
  }

  getNotifyParty() {
    this.url = `${environment.apiUrl}/proforma/fetchNotifyParty2Info`;
		return this.getAll();
  }

  addConsignee(data) {
    this.url = `${environment.apiUrl}/proforma/addConsigneeInfo`;
		return this.create(data);
  }

  getConsignee() {
    this.url = `${environment.apiUrl}/proforma/fetchConsigneeInfo`;
		return this.getAll();
  }

  addLedger(data) {
    this.url = `${environment.apiUrl}/proforma/addProformaLedgerInfo`;
		return this.create(data);
  }

  getLedger() {
    this.url = `${environment.apiUrl}/proforma/fetchProformaLedgerInfo`;
		return this.getAll();
  }

  getDivision() {
    this.url = `${environment.apiUrl}/division`;
		return this.getAll();
  }

  getDistrict() {
    this.url = `${environment.apiUrl}/district`;
		return this.getAll();
  }

  getState() {
    this.url = `${environment.apiUrl}/countrystate`;
		return this.getAll();
  }

  getCountry() {
    this.url = `${environment.apiUrl}/country`;
		return this.getAll();
  }

  getAllFromItemEntry() {
    this.url = `${environment.apiUrl}/getAllFromItemEntry`;
		return this.getAll();
  }
}
