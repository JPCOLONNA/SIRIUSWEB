import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';
import { ExceptionService } from 'app/core/providers/exception.service';
import { SettingsService } from 'app/core/providers/settings.service';

@Injectable()
export class PythieService {

  /** Ressources liées à l'appel de l'API WAPYPLAN - Plan de PYTHIE */
  wapyplan: any;

  constructor(
    private http: HttpClient, 
    private mixinService : MixinService,
    private exceptionService: ExceptionService,
    private settingsService: SettingsService) { 
      this.wapyplan = this.settingsService.get().webservices.assure;
    }

  /**
   * Récupère la liste des plans selon une recherche
   * @param valueForm : Valeur des champs saisie dans le formulaire de recherche
   * @returns Retourne la liste des plans sous forme d'observable
   */
  getListPlan(valueForm: any): Observable<any> {
    // Génération du corps de la requête
    /* TO appel de service
    const body: string = JSON.stringify({
      contexte:       this.wapyplan.contexte.listPlan,
      type_plan:      valueForm.typePlan,
      nom:         valueForm.nom,
      date_debut:     valueForm.dateDebut,
      date_fin:       valueForm.dateFin,
      actif:          valueForm.actif
    });

    const url = this.mixinService.getApiUrl() + this.wapyplan.url;
    return this.sendWebService(body,url);*/
    return this.http.get("resources/tmp/_tmp_liste_plan.json");

  }

  /**
   * Récupère les données d'une branche CP selon un identifiant assuré et une date d'application
   * @param idAssure          Identifiant d'un assuré
   * @param dateApplication   Date d'application de la recherche (par défaut la date du jour)
   */
  getConditionsParticulieres(idAssure: number, dateApplication: Date): Observable<Object> {
    //TO DO Appel web services pour récupérer les informations de la branche CP concernant l'assuré
    // A adapeter à l'appel de service (methode post, body et header)
    return this.http.get("resources/tmp/_tmp_brancheCP.json");
            
  }

  /** Methode générale pour effectuer l'appel d'API */
  sendWebService(body: any, url: string): Observable<any> {
    return this.http.post(
      url,
      body,
      {headers: this.mixinService.getDefaultHeaders()}
    ).catch(
      (error) => this.exceptionService.handleException(error)
    );
  }

}
