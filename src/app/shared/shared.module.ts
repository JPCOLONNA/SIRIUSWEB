import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './components/material-components.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgUploaderModule } from 'ngx-uploader';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { RouterModule, Routes } from '@angular/router';

/*** COMPONENTS ***/
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';


/*** DIRECTIVES***/

/*** PIPES ***/
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CapitalizeEachWordPipe } from './pipes/capitalize-each-word.pipe';
import { MinimizePipe } from './pipes/minimize.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SirenPipe } from './pipes/siren.pipe';
import { DateYMDPipe } from './pipes/dateYMD.pipe';
import { HeurePipe } from './pipes/heure.pipe';

const COMPONENTS = [
  CapitalizePipe,
  CapitalizeEachWordPipe,
  MinimizePipe,
  TruncatePipe,
  BreadcrumbComponent,
  HeaderModalComponent,
  SirenPipe,
  DateYMDPipe,
  HeurePipe
];

@NgModule({
  imports: [
    ClickOutsideModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    NgUploaderModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2DeviceDetectorModule.forRoot(),
    TextMaskModule,
    RouterModule
  ],
  exports: [
    ClickOutsideModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    NgUploaderModule,
    ReactiveFormsModule,
    SimpleNotificationsModule,
    Ng2DeviceDetectorModule,
    TextMaskModule,
    COMPONENTS
  ],
  declarations: [
    COMPONENTS
  ],
  providers: []
})
export class SharedModule { }
