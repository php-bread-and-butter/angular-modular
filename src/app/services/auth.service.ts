import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DataService } from './shared/data.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {

	constructor(private httpClient: HttpClient, private router: Router) {
		super('/users', httpClient, router);
	}
	
	login(credentials: any[]) {
    
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',     
			'cache-control': 'no-cache',
			"Pragma": "no-cache"
		});

		return this.httpClient.post(`${environment.apiUrl}/auth/login`, credentials, { headers: headers })
		.pipe(map((response: any) => {
			let result = response;
			
			if(result && result.token){
				localStorage.setItem('token', result.token);
			}

			return result;
		}), catchError(this.handleError));
	}
	
	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/auth/signin']);
	}
	
	isLoggedIn() {
		let jwtHelper = new JwtHelperService();
		let token = localStorage.getItem('token');

		if(!token)
			return false;

		let expirationDate = jwtHelper.getTokenExpirationDate(token);
		let isExpired = jwtHelper.isTokenExpired(token);

		return !isExpired;
	}

	currentUser() {
		let token = localStorage.getItem('token');
		if(!token)
			return null;
			
		return new JwtHelperService().decodeToken(token);
	}
}
