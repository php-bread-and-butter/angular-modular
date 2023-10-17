import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@NgModule({
  declarations: [
    AuthSigninComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthSigninRoutingModule,
    SharedModule
  ],
	providers: [
		AuthService,
  ]
})
export class AuthSigninModule { }
