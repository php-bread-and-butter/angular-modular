import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from './shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class OpenQuantityServiceService extends DataService {

  constructor(private httpClient: HttpClient, private router: Router) {
    super('/Proforma', httpClient, router);
  }
  
  getAllProformaInvoice() {
    this.url = `${environment.apiUrl}/proforma/getAllProformaInvoice`;
		return this.getAll();
  }
}
