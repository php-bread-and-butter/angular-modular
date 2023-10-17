import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ClauseComponent } from './clause/clause.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/lc/clause',
				pathMatch: 'full'
      },
      {
        path: 'clause',
        component: ClauseComponent
      },
      {
        path: 'application-form',
        component: ApplicationFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LcRoutingModule { }
