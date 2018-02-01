import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { AssuresComponent }       from './assures.component';
import { AssuresRoutingModule }   from './assures-routing.module';
import { SearchAssureComponent }  from './components/search-assure/search-assure.component';
import { SharedModule }           from '../shared/shared.module';
import { ConditionsParticulieresComponent } from './components/conditions-particulieres/conditions-particulieres.component';
import { PythieModule }           from '../pythie/pythie.module';
import { AssuresService }         from './providers/assures.service';
import { SocietesService }        from './providers/societes.service';
import { NotificationsService }   from '../core/providers/notifications.service';

/**
 * Module princiapl de l'application "ASSURES"
 */
@NgModule({
  imports: [
    CommonModule,
    AssuresRoutingModule,
    SharedModule,
    PythieModule
  ],
  declarations: [
    AssuresComponent, 
    SearchAssureComponent, 
    ConditionsParticulieresComponent
  ],
  providers:[
    AssuresService, 
    SocietesService,
    NotificationsService
  ]
})
export class AssuresModule { }
