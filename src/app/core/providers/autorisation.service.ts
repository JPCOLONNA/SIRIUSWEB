import { Injectable } from '@angular/core';
import { MixinService } from './mixin.service';
import { SettingsService } from 'app/core/providers/settings.service';
import { ExceptionService } from 'app/core/providers/exception.service';
import { DroitApplication } from 'app/core/models/DroitApplication';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Application } from 'app/core/models/Applications';


@Injectable()
export class AutorisationService {

  /** Ressources liées à l'appel de l'API WALOGIN - Authentification SIRIUSWEB */
  walogin: any;

  /**
   * Crée une isntance de AutorisationService
   * @param mixinService            Services généraux
   * @param settingsService         Service de la configuration générale
   * @param exceptionService        Services de gestion des exceptions
   * @param http 
   */
  constructor(
    private mixinService: MixinService,
    private settingsService: SettingsService,
    private exceptionService: ExceptionService,
    private http:HttpClient) {
    this.walogin = this.settingsService.get().webservices.login;
  }

  /**
   * Récupère la liste des applications accessibles par l'uilisateur connecté et stocke en session le résultat
   */
  getListApplication() {
    //Utilisateur connecté
    let user = this.mixinService.getFromSession("UserCode").toUpperCase().replace(/"/gi, '');
    if(user != "")
    {
      var body = {
        contexte: this.walogin.contexte.listeApplications,
        profil: user
      }
      const url = this.mixinService.getApiUrl() + this.walogin.url;
      return this.sendWebService(body,url);
    }
  }

  /**
   * Récupère la liste des actions possibles pour l'utilisateur connecté dans une application
   * @param nomAppli      Nom de l'application
   */
  getListDroitsApplication(appliName: string) {
    let user = this.mixinService.getFromSession("UserCode").toUpperCase().replace(/"/gi, '');
    if(user != null)
    {
      var body = {
        contexte: this.walogin.contexte.listeDroitsApplication,
        profil: user,
        nom_appli: appliName
      }
      const url = this.mixinService.getApiUrl() + this.walogin.url;

      return this.sendWebService(body,url);
    }
  }

  /**
   * Sauvegarde en session les droits pour un utilisateur et une application
   * @param nomAppli        Nom de l'application concerné par cet appel
   * @param liste_droits    Liste des droits à mettre en session
   */
  saveDroitInSession(appliName:string,liste_droits:any)
  {
    let droitsApplication:Array <DroitApplication>; 
    
    if(this.mixinService.getFromSession("actions") != "" && this.mixinService.getFromSession("actions") != null)
      droitsApplication = JSON.parse(this.mixinService.getFromSession("actions"));
    else
      droitsApplication = new Array <DroitApplication>();
    
    for(let droit of liste_droits){
      droitsApplication.push(new DroitApplication(droit));
    } 
      
    //Sauvegarde la liste/tableau des droits en session
    this.mixinService.storeInSession("actions",droitsApplication);

    this.mixinService.storeInSession(appliName+"_droits",true);

  }

  /**
   * Controle l'accès à une fonctionnalité selon un écran et un droit pour l'utilisateur authentifié
   * @param ecran     Nom de l'écran
   * @param droit     Le droit souhaité
   */
  isAutorise(ecran: string, droit: string): boolean {
    let retour = false;
    //Récupère en session la liste des actions possibles pour l'utilisateur dans l'application en cours de consultation
    //!! cast en boolean le résultat 0/1
    let listeActions = JSON.parse(this.mixinService.getFromSession("actions"));
        
    if(listeActions != null)
    {
      for (let action of listeActions) {
        if (action.ecran == ecran) {
          return !!action.autorisations[0][droit];
        }
      }
    }
    else
      return retour;
  }

  /** Methode générale pour effectuer l'appel d'API */
  sendWebService(body: any, url: string): Observable<any> {
      return this.http.post(
        url,
        body,
        {headers: this.mixinService.getDefaultHeaders()}
      ).catch(
        (err) => this.exceptionService.handleException(err)
      );
    }

}
