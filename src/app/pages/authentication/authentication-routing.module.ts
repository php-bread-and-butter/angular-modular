import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
				pathMatch: 'full'
      },
      // {
      //   path: 'signup',
      //   loadChildren: () => import('./auth-signup/auth-signup.module').then(module => module.AuthSignupModule)
      // },
      {
        path: 'signin',
        loadChildren: () => import('./auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
      },
      // {
      //   path: 'reset-password',
      //   loadChildren: () => import('./auth-reset-password/auth-reset-password.module').then(module => module.AuthResetPasswordModule)
      // },
      {
        path: 'change-password',
        loadChildren: () => import('./auth-change-password/auth-change-password.module').then(module => module.AuthChangePasswordModule)
      }
    ]
  },
  {
		path: '**',
		redirectTo: '/auth/signin'
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
