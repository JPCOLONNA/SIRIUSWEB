import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';
import { SettingsService } from '../../core/providers/settings.service';
import { ExceptionService } from '../../core/providers/exception.service';

/**
 * Service de l'application "Base tampon" - lié aux données en base tampon
 */
@Injectable()
export class BaseTamponService {

    webservices: any;

  /**
   * Crée une instance d'BaseTamponServices
   * @param http 
   */
  constructor(
    private mixinService : MixinService,
    private settingsService: SettingsService,
    private exceptionService: ExceptionService,
    private http: HttpClient) {
      this.webservices = this.settingsService.get().webservices;
    }


  generateEventsListParameters(filters?:any): string {
    return JSON.stringify({
      contexte: this.webservices.listEvents.contexte,
      idstockage: ""
    });
  }

  loadEventsList(filters?:any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + this.webservices.listEvents.url,
        this.generateEventsListParameters(filters),
        {headers: this.mixinService.getDefaultHeaders()}
      ).catch(error => {
        return this.exceptionService.handleException(error);
      });
  }




  

  /**
   * Récupère la liste des évênements depuis SIRIUS
   * @returns         Les informations concernant ces évênements sous forme d'un Observable
   */
  getListeEvenements(): Observable<any> {
    //TO DO : Appel web service pour lister les évènements
    // A adapeter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http.get("resources/tmp/_tmp_base_tampon.json", { headers: headers });
  }

  /**
   * Récupère les informations concernant un évêment 
   * @param idStockage  Identifiant provenant de la ged
   * @returns Retour les informations d'un évênement sous forme d'observable
   */
  getDetailEvenement(idStockage: number): Observable<any> {
    //TO DO : Appel web service pour lancer la recherche d'un assuré
    // A adapter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http.get("resources/tmp/_tmp_evenement_detail.json", { headers: headers });
  }
  

}
