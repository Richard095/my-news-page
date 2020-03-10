import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { MaterialModule } from 'src/app/material.module';
import { StartComponent } from './start/start.component';
import { FormsModule } from '@angular/forms';
import { PipeAgoModule } from 'src/app/pipe.module';
import { MomentModule } from 'ngx-moment';
import { ProfileComponent } from './profile/profile.component';
import { QuillModule } from "ngx-quill";
import { DatePipe } from "@angular/common"
@NgModule({
  declarations: [
    DashboardComponent,
    CreatepostComponent,
    StartComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    PipeAgoModule,
    MomentModule,
    QuillModule.forRoot()
  ],
  providers: [DatePipe]
})
export class AdminModule { }
