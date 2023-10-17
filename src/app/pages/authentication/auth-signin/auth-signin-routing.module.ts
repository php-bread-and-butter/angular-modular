import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSigninComponent } from './auth-signin.component';

const routes: Routes = [
  {
    path: '',
    component: AuthSigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthSigninRoutingModule { }
