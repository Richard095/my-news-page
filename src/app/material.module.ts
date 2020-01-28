import { NgModule } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';

import {
  MatButtonModule, MatTableModule, MatGridListModule, MatProgressBarModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule

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
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule
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
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule
  ]
})
export class MaterialModule { }
