import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialog,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSliderModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatSortModule,
  MatExpansionModule,
  MatChipsModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

import { getFrenchPaginatorIntl } from '../translate/french-paginator-intl';


//import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
//import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
    imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatSliderModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatSliderModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() }
  ]
})
export class MaterialComponentsModule { }
