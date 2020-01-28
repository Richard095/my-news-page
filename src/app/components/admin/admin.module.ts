import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { MaterialModule } from 'src/app/material.module';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreatepostComponent,
    StartComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
