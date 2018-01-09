import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from "@angular/router";
import { AuthService } from './auth.service';
import { AutorisationService } from './autorisation.service';
import { MixinService } from './mixin.service';
import { cleanSession } from 'selenium-webdriver/safari';


@Injectable()
export class AuthentificationService {

  constructor(private authService: AuthService, private autorisationServices: AutorisationService, private router: Router) { }

  /**
   * Indicates if a route can be activated
   *
   * @returns {boolean}
   *
   * @memberOf AuthGuardService
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    //si l'utilisateur n'est pas identifié
    if (!this.authService.isLoggedIn()) {
      console.log("utilisateur non identifié");
      
      this.router.navigate(["/login"]);
      
      /* TO DO : Récupérer le nom de l'utilisateur via le header d'apache quand le SSO sur IBM i sera en place
       * //si l'utilisateur n'est pas identifier, appel de la procédure pour identifier l'utilisateur
       * this.authService.login();
       * //charge les droits en session
       * this.autorisationServices.getAutorisationUtil("SGAUTHIER").then(() => 
       * {
       * // et vérifie l'autorisation
       * if(this.autorisationServices.isAutorise("wspythie","modifier"))
       *    return true;
       * else
       *    return true;
       * });
       */
    }
    else
    {
      //Si l'utilisateur est identifié, vérification des droits d'accès
      if(this.autorisationServices.isAutorise("wspythie","modifier"))
        console.log("autorisé");
      else
        console.log("pas autorisé");
        
    return true;
    }
  }

  /**
   * Indicates if a child route can be activated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   *
   * @memberOf AuthGuardService
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(): boolean {
    if (!this.authService.isLoggedIn()) {
      //this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
