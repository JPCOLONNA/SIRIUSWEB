import { NgModule }                               from '@angular/core';
import { CommonModule }                           from '@angular/common';
import { BaseTamponRoutingModule }                from './base-tampon-routing.module';
import { BaseTamponComponent }                    from './base-tampon.component';
import { SharedModule }                           from '../shared/shared.module';
import { EventsListComponent }                    from './components/events-list/events-list.component';
import { BaseTamponService }                      from './providers/base-tampon.service';
import { EventDetailComponent }                   from './components/event-detail/event-detail.component';
import { EventDetailAssureComponent }             from './components/event-detail/event-detail-assure/event-detail-assure.component';
import { FormulaireAssureComponent } from './components/formulaire-assure/formulaire-assure.component';

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
    FormulaireAssureComponent
  ],
  providers:
  [
    BaseTamponService
  ]
})
export class BaseTamponModule { }
