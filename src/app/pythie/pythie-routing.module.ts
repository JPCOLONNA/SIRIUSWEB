import { NgModule, ModuleWithProviders,APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PythieComponent } from './pythie.component';
import { AuthGuardService } from '../core/providers/auth-guard.service';
import { PlanListComponent } from './components/plan/plan-list/plan-list.component';
import { PlanDetailComponent } from './components/plan/plan-detail/plan-detail.component';


const pythieRoutes: Routes = [
    {
        path: '',
        component: PythieComponent,
        data:
        {
            appliName:"PYTHIEGES"
        },
        children: [
            {
                path: '',
                redirectTo: 'plan-liste'
            },
            {
                path: 'plan-liste',
                component: PlanListComponent,
                canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Les plans",
                    screenName: "WPYPLANLISTE"
                }
            },
            {
                path: 'plan-detail',
                component: PlanDetailComponent,
                canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Détail d'un plan",
                    screenName: "WPYPLANDETAIL"
                }
            },
            {
                path: 'plan-brancheCP',
                component: PlanDetailComponent,
                canActivate: [AuthGuardService],
                data: {
                    breadcrumb: "Branche \"Conditions particulières\"",
                    screenName: "WPYPLANBRANCHECP"
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pythieRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class PythieRoutingModule { }