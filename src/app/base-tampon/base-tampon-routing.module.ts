import { NgModule, ModuleWithProviders,APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseTamponComponent } from './base-tampon.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { AuthGuardService } from 'app/core/providers/auth-guard.service';


/**
 * Routes:URLs de l'application "BASE TAMPON"
 */
const baseTamponRoutes: Routes = [
    {
        path: '',
        component: BaseTamponComponent,
        children: [
            {
                path: '',
                redirectTo: 'liste'
            },
            {
                path: 'liste',
                component: EventsListComponent,
                canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Liste des évènements",
                    nomEcran: "WBTValidation"
                }
            },
            {
                path: 'fiche',
                component: EventDetailComponent,
                canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Validation de l'évènement",
                    nomEcran: "WBTFICHE"
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