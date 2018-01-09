import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras, Route } from "@angular/router";
import { AuthService } from "./auth.service";
import { AutorisationService } from "app/core/providers/autorisation.service";
import { MixinService } from "app/core/providers/mixin.service";

/**
 * Service de controle d'accès à un écran (autorisation)
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  /**
   * Crée une instance du service AuthGuardService
   *@param AuthService  Service d'authentification
   */
  constructor(private router: Router,
    private authService: AuthService,
    private autorisationService : AutorisationService,
    private mixinService:MixinService) {}

  /**
   * Indique si une route (url) est active/accessible<br />
   * Controle si l'utilisateur est connecté, si ce n'est pas le cas redirige vers la page "login"<br />
   * Controle si l'utilisateur à le droit d'accéder à la page (droit d'éxécution sur la page au minimum)
   * @param route Route appelée
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //controle si l'utilisateur est identifier
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }
    else
      this.autorisationService.getAutorisationUtil(this.mixinService.getFromLocalStorage("currentUser"));
    /* TO DO 
       * //si l'utilisateur n'est pas identifié, appel de la procédure pour identifier l'utilisateur
       * if(!this.authService.isLoggedIn())
       *  this.authService.login();
       * return this.autorisationServices.isAutorise(route.data.nomEcran,"executer")
       */
    //return this.autorisationService.isAutorise(route.data.nomEcran,"executer");
    return true;
  }

/**
 * Indique une route (url) enfant peut être activée/accessible<br />
 * Appel canActivate
 * @param route Route appelée
 * @param state 
 */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  /**
   * Indique une route (url) peut être activée/accessible, lors du chargement<br />
   * Appel canActivate
   * @param route Route chargée
   * @param state 
   */
  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
