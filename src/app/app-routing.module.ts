import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/providers/auth-guard.service';
import { HomeComponent } from './commun/components/home/home.component';
import { LoginComponent } from './commun/components/login/login.component';

const appRoutes: Routes = [
  {
    path: 'pythie',
    loadChildren: './pythie/pythie.module#PythieModule',
    data: {
      breadcrumb: "Pythie",
      screenName: "WPYACCUEIL"
    }
  },
  {
    path: 'tampon',
    loadChildren: './base-tampon/base-tampon.module#BaseTamponModule'
  },
  {
    path: 'assures',
    loadChildren: './assures/assures.module#AssuresModule',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      screenName: "WSWLOGIN"
    }
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: {
      screenName: "WSWACCUEIL"
    }
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true // <-- debugging purposes only
        useHash: true // <-- use oldschool HashLocation strategy
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
