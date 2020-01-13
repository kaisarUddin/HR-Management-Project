import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatExpansionModule,
  MatListModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule


} from '@angular/material';

import { MatBadgeModule } from '@angular/material/badge';
const material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatBadgeModule,
  MatExpansionModule,
  MatListModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
