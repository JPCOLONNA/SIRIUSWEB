import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms/';
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
    private mixinService: MixinService,
    private settingsService: SettingsService,
    private exceptionService: ExceptionService,
    private http: HttpClient) {
    this.webservices = this.settingsService.get().webservices;
  }


  generateEventsListParameters(filters?: any): string {
    return JSON.stringify({
      contexte: this.webservices.listEvents.contexte,
      idstockage: ""
    });
  }

  /**
   * Récupère la liste des évênements depuis SIRIUS
   * @returns         Les informations concernant ces évênements sous forme d'un Observable
   */
  loadEventsList(filters?: any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.listEvents.url,
      this.generateEventsListParameters(filters),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }


  generateEventDetailsParameters(idstockage: string, idevenement: string, filters?: any): string {
    return JSON.stringify({
      contexte: this.webservices.eventDetails.contexte,
      idstockage: idstockage,
      idevenement: idevenement
    });
  }


  /**
 * Récupère le détail d'un évênement depuis SIRIUS
 * @returns         Les informations concernant cet évênement sont sous forme d'un Observable
 */
  loadEventDetails(idstockage: string, idevenement: string, filters?: any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.eventDetails.url,
      this.generateEventDetailsParameters(idstockage, idevenement, filters),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }


  generateParametersParameters(): string {
    return JSON.stringify({
      contexte: this.webservices.parameters.contexte
    });
  }


  generateSupprEventParameters(filters?: any): string {
    return JSON.stringify({
      contexte: this.webservices.validEvent.contexte
    });
  }



  /**
 * Récupère le détail d'un évênement depuis SIRIUS
 * @returns         Les informations concernant cet évênement sont sous forme d'un Observable
 */
  loadParameters(): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.parameters.url,
      this.generateParametersParameters(),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }



  generateSaveAssureParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.saveEvent.contexte;
    JSONArg["nomfic"] = this.webservices.saveEvent.fic_assures;
    return JSON.stringify(JSONArg);
  }

  generateSaveBeneficiaireParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.saveEvent.contexte;
    JSONArg["nomfic"] = this.webservices.saveEvent.fic_benefs;
    return JSON.stringify(JSONArg);
  }

  generateSaveCouvertureParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.saveEvent.contexte;
    JSONArg["nomfic"] = this.webservices.saveEvent.fic_couverture;
    return JSON.stringify(JSONArg);
  }

  generateSaveCouvertureBeneficiaireParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.saveEvent.contexte;
    JSONArg["nomfic"] = this.webservices.saveEvent.fic_couverturebenef;
    return JSON.stringify(JSONArg);
  }

  generateSaveIbanParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.saveEvent.contexte;
    JSONArg["nomfic"] = this.webservices.saveEvent.fic_iban;
    return JSON.stringify(JSONArg);
  }


  generateSaveInfosSalParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.saveEvent.contexte;
    JSONArg["nomfic"] = this.webservices.saveEvent.fic_infossal;
    return JSON.stringify(JSONArg);
  }

  generateValidEventParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.validEvent.contexte;
    return JSON.stringify(JSONArg);
  }

  generateDeleteEventParameters(JSONArg: any): string {
    JSONArg["contexte"] = this.webservices.deleteEvent.contexte;
    return JSON.stringify(JSONArg);
  }

  /**
 * Récupère le détail d'un évênement depuis SIRIUS
 * @returns         Les informations concernant cet évênement sont sous forme d'un Observable
 */
  saveAssureEvent(JSONArg: any, type: number): Observable<any> {
    if (type === 0) {
      return this.http.post(
        this.mixinService.getApiUrl() + '/' + this.webservices.saveEvent.url,
        this.generateSaveAssureParameters(JSONArg),
        { headers: this.mixinService.getDefaultHeaders() }
      ).catch(error => {
        return this.exceptionService.handleException(error);
      });
    } else {
      return this.http.post(
        this.mixinService.getApiUrl() + '/' + this.webservices.saveEvent.url,
        this.generateSaveBeneficiaireParameters(JSONArg),
        { headers: this.mixinService.getDefaultHeaders() }
      ).catch(error => {
        return this.exceptionService.handleException(error);
      });
    }
  }

  saveCouvertureEvent(JSONArg: any, type: number): Observable<any> {
    if (type === 0) {
      return this.http.post(
        this.mixinService.getApiUrl() + '/' + this.webservices.saveEvent.url,
        this.generateSaveCouvertureParameters(JSONArg),
        { headers: this.mixinService.getDefaultHeaders() }
      ).catch(error => {
        return this.exceptionService.handleException(error);
      });
    } else {
      return this.http.post(
        this.mixinService.getApiUrl() + '/' + this.webservices.saveEvent.url,
        this.generateSaveCouvertureBeneficiaireParameters(JSONArg),
        { headers: this.mixinService.getDefaultHeaders() }
      ).catch(error => {
        return this.exceptionService.handleException(error);
      });
    }
  }

  saveIbanEvent(JSONArg: any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.saveEvent.url,
      this.generateSaveIbanParameters(JSONArg),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }

  saveInfosSalEvent(JSONArg: any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.saveEvent.url,
      this.generateSaveInfosSalParameters(JSONArg),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }

  validEvent(JSONArg: any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.validEvent.url,
      this.generateValidEventParameters(JSONArg),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }

  deleteEvent(JSONArg: any): Observable<any> {
    return this.http.post(
      this.mixinService.getApiUrl() + '/' + this.webservices.deleteEvent.url,
      this.generateDeleteEventParameters(JSONArg),
      { headers: this.mixinService.getDefaultHeaders() }
    ).catch(error => {
      return this.exceptionService.handleException(error);
    });
  }

  /*
    //A SUPPRIMER PLUS UTILISÉ  
    getListeEvenements(): Observable<any> {
      //TO DO : Appel web service pour lister les évènements
      // A adapeter à l'appel de service (methode post, body et header)
      let headers = this.mixinService.getDefaultHeaders();
      return this.http.get("resources/tmp/_tmp_base_tampon.json", { headers: headers });
    }
  
    getDetailEvenement(idStockage: number): Observable<any> {
      //TO DO : Appel web service pour lancer la recherche d'un assuré
      // A adapter à l'appel de service (methode post, body et header)
      let headers = this.mixinService.getDefaultHeaders();
      return this.http.get("resources/tmp/_tmp_evenement_detail.json", { headers: headers });
    }*/


}
