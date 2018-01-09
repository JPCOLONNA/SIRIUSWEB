import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';

/**
 * Service de l'application "ASSURES" - lié aux sociétées
 */
@Injectable()
export class SocietesService {

  /**
   * Crée une instance de SocietesService
   * @param http 
   */
  constructor(private http: HttpClient,
    private mixinService : MixinService) { }

  /**
   * Récupère les informations générales d'une société Frais Médicaux (FM) depuis un id assuré
   * @param idAssure  Identifiant d'un assuré
   * @returns         Les informations de la société sous forme d'observable
   */
  getSocieteFM(idAssure:number): Observable<any>
  {
    //TO DO : Appel web service pour lancer la recherche d'une société selon le type de société (FM,PV) et le numéro id de l'assuré
    // A adapter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
        .get("resources/tmp/_tmp_societe.json", { headers: headers });
  }

}
