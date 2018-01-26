import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras, Route } from "@angular/router";
import { AuthService } from "./auth.service";
import { AutorisationService } from "app/core/providers/autorisation.service";
import { MixinService } from "app/core/providers/mixin.service";
import { Observable } from "rxjs/Observable";


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
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    var isAutorise = false;

    //Vérifie que l'utilisateur est connu, normalement toujours connu car ses informations sont récupérées à chaque appel d'URL
    if(this.authService.isLoggedIn())
    {
      //vérifie que l'utilisateur à accès à cette écran
      //A SUPPRIMER quand l'écran sera paramétré
      if(route.data.screenName == "WSWACCUEIL")
        isAutorise = true;    
      
      //vérifie que l'utilisateur à accès à cette écran
      if(this.autorisationService.isAutorise(route.data.screenName,"executer"))
      {
        isAutorise = true;  
      }
      //Si ce n'est pas le cas, les droits pour l'application ne sont peut être pas chargés en mémoire
      else
      {
        //Récupère le nom de l'application
        let appliName = route.parent.data.appliName;
        //TO DO : boucle jusqu'à trouver le nom de l'application

        //nom de l'application
        if(appliName != null && appliName != undefined)
        {
          //controle si la liste des droits de l'utilisateur pour l'application est connue (flag en session)
          if(JSON.parse(this.mixinService.getFromSession(appliName+"_droits")) == null)
          {
            //récupère les droits
            this.autorisationService.getListDroitsApplication(appliName)
            .map(
              (data) => {
                if (data.hasOwnProperty('success') && data.success === 'true') {
                  //sauvegarde en session
                  this.autorisationService.saveDroitInSession(appliName,data.liste_droits);
                  //controle l'accès
                  isAutorise = this.autorisationService.isAutorise(route.data.screenName,"executer");
                }
              });
          }
        }
      }
    }
    else
    {
      //Redirige vers la page de login
      this.authService.login();
    }

    //vérifie que l'utilisateur à accès à cette écran
    if(route.data.screenName != "WSWACCUEIL")
      isAutorise = this.autorisationService.isAutorise(route.data.screenName,"executer");
    else
      isAutorise = true;
      
    // Si l'utilisateur est connecté et l'accès est refusé, il est redirigé vers une page "Accès refusé"
    if(isAutorise == false)
      this.router.navigate['acces-refuse'];
    return Observable.of(isAutorise);
  }

/**
 * Indique une route (url) enfant peut être activée/accessible<br />
 * Appel canActivate
 * @param route Route appelée
 * @param state 
 */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  /**
   * Indique une route (url) peut être activée/accessible, lors du chargement<br />
   * Appel canActivate
   * @param route Route chargée
   * @param state 
   */
  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
