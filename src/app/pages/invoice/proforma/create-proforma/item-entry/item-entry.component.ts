import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OpenQuantityReport1Model } from 'src/app/models/open-quantity-report-1.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ItemDataService } from 'src/app/services/item-data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.scss']
})
export class ItemEntryComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton;

  subscription: Subscription;
  openQuantityReport1List: OpenQuantityReport1Model[] = [];
  newTreeForOpenQuantityReport1List: OpenQuantityReport1Model[] = [];

  constructor(
    private fb: FormBuilder, 
    public invoiceService: InvoiceService, 
    private itemDataService: ItemDataService) {}

  ngOnInit() {
  }

  public itemEntryForm: FormGroup = this.fb.group({});
  
  saveItemEntry() {
    this.closebutton.nativeElement.click();
  }

  onSelect(newItem): void {
    this.invoiceService.selectedItem = newItem;

    let numberOfChildLeaves: number = this.invoiceService.itemEntryList
      .filter(data => data.parent === newItem.itemid).length;
    if (numberOfChildLeaves === 0) {
    }
    else {
      this.invoiceService.filteredItems = this.invoiceService.itemEntryList
        .filter(data => data.parent === newItem.itemid)
        .sort((a, b) => a.itemid < b.itemid ? -1 : a.itemid > b.itemid ? 1 : 0);

      this.invoiceService.selectedItem = this.invoiceService.filteredItems[0];

      this.invoiceService.filteredItems = this.invoiceService.itemEntryList
        .filter(data => data.parent === this.invoiceService.selectedItem.parent)
        .sort((a, b) => a.itemid < b.itemid ? -1 : a.itemid > b.itemid ? 1 : 0);
    }
  }

  searchItemEntry(query: string) {
    this.invoiceService.filteredItems = (query) ? 
    this.invoiceService.itemEntryList.filter(k => {
      let itemIdCombined = 'IN'+k.itemid;
      let itemCombined = 'IN'+k.itemid+'-'+k.name;
      return (
        k.itemid.toString().includes(query.toLowerCase()) || 
        k.name.toLowerCase().includes(query.toLowerCase()) || 
        itemIdCombined.toLowerCase().includes(query.toLowerCase()) || 
        itemCombined.toLowerCase().includes(query.toLowerCase())
      )
    }) : 
    this.invoiceService.itemEntryList;
  }
  
  onBackButtonClick() {
    if (!this.invoiceService.selectedItem) {

    }
    else {
      if (this.invoiceService.selectedItem.parent === 0) {
        this.invoiceService.selectedItem = null;
      }
      else {
        this.invoiceService.selectedItem = this.invoiceService.itemEntryList
          .find(data => data.itemid === this.invoiceService.selectedItem.parent);
        this.invoiceService.filteredItems = this.invoiceService.itemEntryList
          .filter(data => data.parent === this.invoiceService.selectedItem.parent);
      }
    }
  }

  onAddHeadToTopLevelButtonClick() {
    this.itemDataService.changeMessageForParent('0');
    this.itemDataService.changeMessageForTopParent('0');
    this.itemDataService.changeMessageForDepth('0');
  }
  
  onPrintButtonClick() {

    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    let spaceString: string = '';
    let customAccountingHeadName: string = '';
    let generateTable: string = '';
    let slno: number = 1;
    let totalPositiveOpenBalance: number = 0;


    for (let element of this.openQuantityReport1List.filter(data => this.getItemDepth(data.itemid) === 0)) {
      this.generateTree(element);
    }

    for (let element of this.newTreeForOpenQuantityReport1List) {

      for (let i = 0; i <= this.getItemDepth(element.itemid); i++) {
        if (i === 0) {
          continue;
        }
        else {
          spaceString = '   ' + spaceString;
        }
      }

      customAccountingHeadName = spaceString + element.itemname;

      if (element.openqty === 0) {
        generateTable = generateTable + `
        <tr>
          <th scope="row" style="text-align: center">`+ element.itemid + `</th>
          <td style="text-align: left; white-space: pre;">`+ customAccountingHeadName + `</td>
          <td style="text-align: right"></td>
        </tr>
        `;
      }
      else if (element.openqty > 0) {
        totalPositiveOpenBalance = totalPositiveOpenBalance + element.openqty;
        generateTable = generateTable + `
        <tr>
          <th scope="row" style="text-align: center;">`+ element.itemid + `</th>
          <td style="text-align: left; white-space: pre;">`+ customAccountingHeadName + `</td>
          <td style="text-align: right">`+ element.openqty + `</td>
        </tr>
        `;
      }
      spaceString = ``;
      customAccountingHeadName = ``;
      slno = slno + 1;
    }
    generateTable = generateTable + `
    <tr>
      <th colspan="2" scope="row" style="text-align: right">Total:</th>
      <td style="text-align: right">`+ totalPositiveOpenBalance + `</td>
    </tr>
    `;
    popupWin.document.write(`
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
              integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
              integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
              crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
              integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
              crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
              integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
              crossorigin="anonymous"></script>
      </head>

      <body>
          <div class="row justify-content-center">
              <div class="col-auto">
                  <div class="row d-flex justify-content-center" style="margin: 0%; padding: 0%;">
                      <div class="col-auto" style="margin: 0%; padding: 0%;">
                          <h4 style="text-align: left; margin: 0%; padding: 0%; font-weight: bold;">
                              The Daily Star<br>
                          </h4>
                          <p style="text-align: left; margin: 0%; padding: 0%;">
                              64-65, Kazi Nazrul Islam Avenue, Dhaka-1215<br>
                          </p>
                          <p style="text-align: left; margin: 0%; padding: 0%;">
                              Phone: 09610222222, 9144330, 58156305
                          </p>
                          <p style="text-align: center; font-weight: bold; text-decoration: underline; margin: 0%; padding: 0%; margin-top: 1rem; margin-bottom: 2rem">
                              Item List
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row justify-content-center">
              <div class="col-auto">
                  <table class="table table-sm table-bordered">
                      <thead style="font-weight: bold; white-space: nowrap;">
                          <tr>
                              <th scope="col" style="text-align: center; border-collapse: collapse; border-top: none">Code</th>
                              <th scope="col" style="text-align: left; border-collapse: collapse; border-top: none">Item Name</th>
                              <th scope="col" style="text-align: center; border-collapse: collapse;">Open Qty</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              ` + generateTable + `
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

      </body>

      </html>
      `
    );
    popupWin.document.close();
    popupWin.print();
  }

  getCurrentItemName(): string {
    if (this.invoiceService.selectedItem === null) return 'None';

    return this.invoiceService.selectedItem['name'];
  }

  getCurrentItemParentName(): string {
    if (this.invoiceService.selectedItem === null) return 'None';

    else if (this.invoiceService.selectedItem.parent === 0) return 'None';

    return this.invoiceService.itemEntryList
      .find(data => data.itemid === this.invoiceService.selectedItem.parent)['name'];
  }

  getCurrentPath(): string {
    if (this.invoiceService.selectedItem === null) return 'None';

    else if (this.invoiceService.selectedItem.parent === 0) return this.invoiceService.selectedItem['name'];

    let item = this.invoiceService.itemEntryList.find(data => data.itemid === this.invoiceService.selectedItem.parent);
    if (item.parent === 0) return item['name'];

    return this.invoiceService.itemEntryList.find(data => data.itemid === item.parent)['name'] + '->' + item['name'] + '->' + this.invoiceService.selectedItem['name'];
  }

  generateTree(newReport: OpenQuantityReport1Model) {
    this.newTreeForOpenQuantityReport1List.push(newReport);
    let itemList = this.invoiceService.itemEntryList.filter(data => data.parent === newReport.itemid);
    // if there is children
    if (itemList.length > 0) {
      for (let element of itemList) {
        this.generateTree(this.openQuantityReport1List.find(data => data.itemid === element.itemid));
      }
    }
    else {

    }
  }

  getItemDepth(newItemId: number) {
    if (this.invoiceService.itemEntryList) {
      return this.invoiceService.itemEntryList.find(data => data.itemid === newItemId).depth;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
  }
}
