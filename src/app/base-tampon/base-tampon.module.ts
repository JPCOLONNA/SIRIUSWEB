import { NgModule }                               from '@angular/core';
import { CommonModule }                           from '@angular/common';
import { BaseTamponRoutingModule }                from './base-tampon-routing.module';
import { BaseTamponComponent }                    from './base-tampon.component';
import { SharedModule }                           from '../shared/shared.module';
import { EventsListComponent }                    from './components/events-list/events-list.component';
import { BaseTamponService }                      from './providers/base-tampon.service';
import { EventDetailComponent }                   from './components/event-detail/event-detail.component';
import { EventDetailAssureComponent }             from './components/event-detail/event-detail-assure/event-detail-assure.component';
import { FormulaireAssureComponent }              from './components/formulaire-assure/formulaire-assure.component';
import { FormulaireCouvertureComponent }          from './components/formulaire-couverture/formulaire-couverture.component';
import { FormulaireInfosSalarialesComponent }     from './components/formulaire-infos-salariales/formulaire-infos-salariales.component';
import { FormulaireIbanComponent }                from './components/formulaire-iban/formulaire-iban.component';
import { AutorisationService }                    from '../core/providers/autorisation.service';
import { NotificationsService}                    from '../core/providers/notifications.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BaseTamponRoutingModule
  ],
  declarations: [
    BaseTamponComponent,
    EventsListComponent,
    EventDetailComponent,
    EventDetailAssureComponent,
    FormulaireAssureComponent,
    FormulaireCouvertureComponent,
    FormulaireInfosSalarialesComponent,
    FormulaireIbanComponent
  ],
  providers:
  [
    BaseTamponService,
    NotificationsService
  ]
})
export class BaseTamponModule { }
