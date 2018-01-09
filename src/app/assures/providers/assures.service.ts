import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';

/**
 * Service de l'application "ASSURES" - lié aux assurés
 */
@Injectable()
export class AssuresService {

  /**
   * Crée une instance d'AssuresServices
   * @param http 
   */
  constructor(private mixinService: MixinService, private http: HttpClient) { }

  /**
   * Récupère les informations générales d'un assuré depuis un id assuré
   * @param idAssure  Identifiant d'un assuré
   * @returns         Les informations de l'assuré sous forme d'observable
   */
  getAssure(idAssure: number): Observable<any> {
    //TO DO : Appel web service pour lancer la recherche d'un assuré
    // A adapeter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
        .get("resources/tmp/_tmp_assure.json", { headers: headers });
  }

  /**
   * Récupère la liste des assurés
   * @returns Retour la liste des assurés sous forme d'observable
   */
  getListAssures(): Observable<any> {
    //TO DO : Appel web service pour lancer la recherche d'un assuré
    // A adapter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
        .get("resources/tmp/_tmp_liste_assure.json", { headers: headers });
  }

}
