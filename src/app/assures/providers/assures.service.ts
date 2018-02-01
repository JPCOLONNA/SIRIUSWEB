import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';
import { SettingsService } from 'app/core/providers/settings.service';
import { ExceptionService } from 'app/core/providers/exception.service';

/**
 * Service de l'application "ASSURES" - lié aux assurés
 */
@Injectable()
export class AssuresService {

  /** Ressources liées à l'appel de l'API WALOGIN - Authentification SIRIUSWEB */
  waassure: any;

  /**
   * Crée une instance d'AssuresServices
   * @param http 
   */
  constructor(
    private mixinService: MixinService, 
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private settingsService: SettingsService,) { 
      this.waassure = this.settingsService.get().webservices.assure;
    }

  /**
   * Récupère les informations générales d'un assuré depuis un id assuré
   * @param idAssure  Identifiant d'un assuré
   * @returns         Les informations de l'assuré sous forme d'observable
   */
  getAssure(idAssure: number): Observable<any> {
    // Génération du corps de la requête
    const body: string = JSON.stringify({
      contexte:   this.waassure.contexte.infoAssure,
      id_assure:  idAssure
    });

    // Envoie de la requête
    const url = this.mixinService.getApiUrl() + this.waassure.url;
    return this.sendWebService(body,url);
  }

  /**
   * Récupère la liste des assurés
   * @param valueForm : Valeur des champs saisie dans le formulaire de recherche
   * @returns Retourne la liste des assurés sous forme d'observable
   */
  getListAssures(valueForm: any): Observable<any> {
    // Génération du corps de la requête
    const body: string = JSON.stringify({
      contexte:       this.waassure.contexte.listeAssures,
      id_assure:      valueForm.numAssure,
      num_ss:         valueForm.numSS,
      date_naissance: valueForm.dateNaissance,
      nom:            valueForm.nom,
      prenom:         valueForm.prenom,
      code_postal:    valueForm.codePostal      
    });

    const url = this.mixinService.getApiUrl() + this.waassure.url;
    return this.sendWebService(body,url);
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
