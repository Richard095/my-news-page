import { NgModule } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';

import {
  MatButtonModule, MatProgressBarModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule

} from "@angular/material"
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
