import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-proforma',
  templateUrl: './list-proforma.component.html',
  styleUrls: ['./list-proforma.component.scss']
})
export class ListProformaComponent implements OnInit, OnDestroy{
  
  dtOptions: DataTables.Settings = {};
  proformaInvoice = [];
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private invoiceService: InvoiceService) {
  }
  
  ngOnInit() {
    this.proformaInvoice = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    };
    
    this.invoiceService.getAllProformaInvoice().subscribe((res: any)=> {
      this.proformaInvoice = res.payload;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }
  
  deleteProforma(data) {
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
        this.invoiceService.deleteProforma(data.proformaInvoiceNo).subscribe(response => {
          let index = this.proformaInvoice.indexOf(data);
          this.proformaInvoice.splice(index, 1);          
          
          Swal.fire('Deleted!', 'Record has been deleted.', 'success')
        });
      }
    });
    
  }
  
  ngOnDestroy() {
    this.dtTrigger?.unsubscribe();
  }
}
