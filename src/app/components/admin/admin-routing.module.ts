import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CreatepostComponent } from './createpost/createpost.component';
import { StartComponent } from './start/start.component';
import { AdminStartRedirectGuard } from 'src/app/shared/guards/admin-start-redirect.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'createpost', component: CreatepostComponent
      },
      {
        path: 'start', component: StartComponent
      },
      {
        path: 'createpost/edit/:id', component: CreatepostComponent
      },
      {
        path: 'profile', component: ProfileComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
