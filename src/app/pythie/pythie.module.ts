import { APP_INITIALIZER, NgModule, Optional, SkipSelf, LOCALE_ID,PLATFORM_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule }             from '@angular/forms';
import { ResourcesPythieService }                       from './providers/resources-pythie.service';
import { PythieComponent }                              from './pythie.component';
import { PythieRoutingModule }                          from './pythie-routing.module';
import { throwIfAlreadyLoaded }                         from '../core/module-import-guard';
import { SharedModule }                                 from '../shared/shared.module';
import { ConditionsParticulieresInformationsComponent } from './components/conditions-particulieres/conditions-particulieres-informations/conditions-particulieres-informations.component';
import { PythieService }                                from './providers/pythie.service';
import { ModalListesStructureComponent }                from './components/modal-listes-structure/modal-listes-structure.component';
import { ConditionsParticulieresActionsComponent }      from './components/conditions-particulieres/conditions-particulieres-actions/conditions-particulieres-actions.component';
import { ConditionsParticulieresMotifsActionComponent } from './components/conditions-particulieres/conditions-particulieres-motifs-action/conditions-particulieres-motifs-action.component';
import { PlanListComponent }                            from './components/plan/plan-list/plan-list.component';
import { NotificationsService }                         from '../core/providers/notifications.service';
import { PlanDetailComponent }                          from './components/plan/plan-detail/plan-detail.component';
import { ModalFormulairePlanComponent }                 from './components/plan/modal-formulaire-plan/modal-formulaire-plan.component';

@NgModule({
  imports: [
    PythieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    PythieComponent,
    ConditionsParticulieresInformationsComponent,
    ModalListesStructureComponent,
    ConditionsParticulieresActionsComponent,
    ConditionsParticulieresMotifsActionComponent,
    PlanListComponent,
    PlanDetailComponent,
    ModalFormulairePlanComponent
  ],
  exports: [
    ConditionsParticulieresInformationsComponent, 
    ModalListesStructureComponent,
    ConditionsParticulieresActionsComponent
  ],
  entryComponents:[
    ModalListesStructureComponent,
    ModalFormulairePlanComponent],
  providers: [
    PythieService,
  NotificationsService
]
})
export class PythieModule { 
  constructor( @Optional() @SkipSelf() parentModule: PythieModule) {
    throwIfAlreadyLoaded(parentModule, 'PythieModule');
  }
}


