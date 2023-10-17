import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { AppError } from '../error-handlers/app-error';
import { BadInputError } from '../error-handlers/bad-input-error';
import { NotFoundError } from '../error-handlers/not-found-error';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UnauthoziedError } from '../error-handlers/unauthozied-error';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export class DataService {
	protected url: string;
	private auth;
	
	constructor(
		private uri: string, 
		private _http: HttpClient, 
		private _router?: Router) {
		this.url = environment.apiUrl+uri;
	}
	
	public getAll() {
		return this._http.get(this.url)
		.pipe(map( response => response ), catchError(this.handleError));
	}
	
	public get(id: number) {
		return this._http.get(this.url+'/'+id)
		.pipe(map( response => response ), catchError(this.handleError));
	}
	
	public create(resource: any) {
		return this._http.post(this.url, resource)
		.pipe(map( response => response ), catchError(this.handleError))
	}
	
	public delete(id: number) {
		return this._http.delete(this.url+'/'+id)
		.pipe(map( response => response ), catchError(this.handleError));
	}
	
	protected handleError(error: Response) {
		if(error.status === 404)
		{
			return throwError(new NotFoundError());
		}
		else if(error.status === 405)
		{
			this.auth = new AuthService(this._http, this._router);
			this.auth.logout();
			
			return throwError(new UnauthoziedError(error));
		}
		else if(error.status === 400)
		{
			return throwError(new BadInputError(error));
		}
		
		return throwError(new AppError(error));
	}
}