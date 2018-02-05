import { NgModule, LOCALE_ID }      from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';
import { HttpClientModule }         from '@angular/common/http';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'; // Animation module for Angular Material components


import { AppRoutingModule }         from './app-routing.module';
import { CoreModule }               from './core/core.module';
import { SharedModule }             from './shared/shared.module';
import { PythieModule }             from './pythie/pythie.module';

import { AppComponent }             from './app.component';
import { MenuNavigationComponent } from './commun/components/menu-navigation/menu-navigation.component';

import { DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HomeComponent } from './commun/components/home/home.component';
import { LoginComponent } from './commun/components/login/login.component';
import { ModalMessageComponent } from './commun/components/modal-message/modal-message.component';
//import { HeaderModalComponent } from './commun/shared/components/header-modal/header-modal.component';
import { ModalListePiecesComponent } from './commun/components/modal-liste-pieces/modal-liste-pieces.component';
import { ModalPlusDinfoComponent } from './commun/components/modal-plus-dinfo/modal-plus-dinfo.component';
import { AccessDeniedComponent } from './commun/components/access-denied/access-denied.component';
import { ModalConfirmComponent } from './commun/components/modal-confirm/modal-confirm.component';


//Module Matérial en français
registerLocaleData(localeFr);

// Commentaire pas pris en compte dans la documentation
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule, 
    SharedModule
  ],
  exports: [],
  declarations: [
    AppComponent, 
    MenuNavigationComponent, 
    HomeComponent, 
    LoginComponent, 
    ModalMessageComponent, 
    ModalListePiecesComponent, 
    ModalPlusDinfoComponent, 
    AccessDeniedComponent,
    ModalConfirmComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalMessageComponent,
    ModalListePiecesComponent,
    ModalPlusDinfoComponent,
    ModalConfirmComponent]
})

export class AppModule { }
