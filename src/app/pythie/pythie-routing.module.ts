import { NgModule, ModuleWithProviders,APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PythieComponent } from './pythie.component';
import { AuthGuardService } from '../core/providers/auth-guard.service';


const pythieRoutes: Routes = [
    {
        path: '',
        component: PythieComponent
       
    }
];

/*
 children: [
    {
        path: 'cp',
        component: ConditionsParticulieresComponent,
        canLoad: [AuthGuardService],
        data: {
            breadcrumb: "Conditions particulières",
            screenName: "WPASSURECP"
        }
    }
]
*/

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