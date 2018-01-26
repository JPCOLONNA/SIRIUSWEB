import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';
import { ExceptionService } from 'app/core/providers/exception.service';

@Injectable()
export class PythieService {

  constructor(
    private http: HttpClient, 
    private mixinService : MixinService,
    private exceptionService: ExceptionService) { }

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
