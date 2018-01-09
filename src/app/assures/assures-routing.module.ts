import { NgModule, ModuleWithProviders,APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssuresComponent } from './assures.component';
import { ConditionsParticulieresComponent } from './components/conditions-particulieres/conditions-particulieres.component';
import { AuthGuardService } from '../core/providers/auth-guard.service';
import { SearchAssureComponent } from './components/search-assure/search-assure.component';

/**
 * Routes:URLs de l'application "ASSURES"
 */
const assuresRoutes: Routes = [
    {
        path: '',
        component: AssuresComponent,
        children: [
            {
                path: '',
                redirectTo: 'recherche'
            },
            {
                path: 'recherche',
                component: SearchAssureComponent,
                canLoad: [AuthGuardService],
                data: {
                    breadcrumb: "Recherche d'un assuré",
                    nomEcran: "WASRECHERCHE"
                }
            },
            {
                path: 'cp',
                component: ConditionsParticulieresComponent,
                canLoad: [AuthGuardService],
                data: {
                    breadcrumb: "Conditions particulières",
                    nomEcran: "WASCONDIPART"
                }
            }
        ]
    }
];

/**
 * Gestion des routes/URLs de l'applications "ASSURES"
 */
@NgModule({
    imports: [
        RouterModule.forChild(assuresRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AssuresRoutingModule { }