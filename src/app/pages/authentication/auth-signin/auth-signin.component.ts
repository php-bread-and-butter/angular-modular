import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppError } from 'src/app/services/error-handlers/app-error';
import { NotFoundError } from 'src/app/services/error-handlers/not-found-error';
import { UserValidators } from './user-validators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
	selector: 'app-auth-signin',
	templateUrl: './auth-signin.component.html',
	styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
	loading: boolean = false;
	invalidLogin: boolean;
	loginError: string;
	
	constructor(private fb: FormBuilder, 
		private router: Router, 
		private authService: AuthService, 
		private route: ActivatedRoute) {}

	ngOnInit(): void {
		if(this.authService.currentUser()) {
			this.router.navigate(['/']);
		}
	}
	
	loginForm = this.fb.group({
		'email' : [
			localStorage.getItem('email') || '', 
			[
				Validators.required,
				UserValidators.noSpace,
				Validators.email
			]
		],
		'pwd': [
			localStorage.getItem('pwd') || '', 
			[
				Validators.required,
				Validators.minLength(3),
				UserValidators.noSpace
			]
		],
		'remember-me': [
			localStorage.getItem('rememberMe') || ''
		]
	});
	
	public get userEmail() {
		return this.loginForm.get('email');
	}
	
	public get userPass() {
		return this.loginForm.get('pwd');
	}
	
	public get rememberMe() {
		return this.loginForm.get('remember-me');
	}
	
	signIn() {
		this.loading = true;
		localStorage.clear();
		
		let credentials = this.loginForm.value;
		credentials.role = 'admin';
		this.authService.login(credentials)
		.subscribe(
			result => {
				this.loading = false;
				if(result.isSuccess) {
					if(this.rememberMe.value)
					{
						localStorage.setItem('rememberMe', this.rememberMe.value);
						localStorage.setItem('email', this.userEmail.value);
						localStorage.setItem('pwd', this.userPass.value);
					}
					
					let redirectUrl = this.route.snapshot.queryParamMap.get('redirect');
					this.router.navigate([redirectUrl || '/']);
				}
				else {
					this.invalidLogin = true;
					this.loginError = result.serviceMessage;
				}
			},
			(error: AppError) => {
				this.loading = false;
				Swal.fire('Server error!', '', 'error');
			});
	}
	
}
	