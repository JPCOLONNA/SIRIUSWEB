import { NgModule, ModuleWithProviders,APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseTamponComponent } from './base-tampon.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { AuthGuardService } from 'app/core/providers/auth-guard.service';
import { AutorisationService } from 'app/core/providers/autorisation.service';


/**
 * Routes:URLs de l'application "BASE TAMPON"
 */
const baseTamponRoutes: Routes = [
    {
        path: '',
        component: BaseTamponComponent,
        data:
        {
            appliName:"BASE_TAMPON"
        },
        children: [
            {
                path: '',
                redirectTo: 'liste'
            },
            {
                path: 'liste',
                component: EventsListComponent,
                //canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Liste des évènements",
                    screenName: "WBTLISTE"
                }
            },
            {
                path: 'fiche',
                component: EventDetailComponent,
                //canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Détail de l'évènement",
                    screenName: "WBTDETAIL"
                }
            }
            ,
            {
                path: 'ged/:idstockage',
                component: EventDetailComponent,
                //canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Détail de l'évènement",
                    screenName: "WBTDETAIL"
                }
            }
        ]
    }
];

/**
 * Gestion des routes/URLs de l'applications "BASE TAMPON"
 */
@NgModule({
    imports: [
        RouterModule.forChild(baseTamponRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class BaseTamponRoutingModule { }