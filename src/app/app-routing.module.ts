import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
				path: '',
				redirectTo: 'user/dashboard',
				pathMatch: 'full',
			},
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(module => module.UserModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./pages/order/order.module').then(module => module.OrderModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./pages/invoice/invoice.module').then(module => module.InvoiceModule)
      },
      {
        path: 'lc',
        loadChildren: () => import('./pages/lc/lc.module').then(module => module.LcModule)
      },
      {
        path: 'insurance',
        loadChildren: () => import('./pages/insurance/insurance.module').then(module => module.InsuranceModule)
      },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
				path: '',
				redirectTo: 'auth/signin',
				pathMatch: 'full',
			},
      {
        path: 'auth',
        loadChildren: () => import('./pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
    ]
  },
  {
		path: '**',
		redirectTo: '/user/dashboard'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
