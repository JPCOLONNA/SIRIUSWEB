import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';
import { ExceptionService } from 'app/core/providers/exception.service';

@Injectable()
export class ListService {

  /** Ressources liées à l'appel de l'API WALISTE - Liste de toutes les applications */
  waliste: any;
  

  constructor(
    private http: HttpClient, 
    private mixinService: MixinService,
    private exceptionService: ExceptionService) { }

  /**
   * Récupère l'entête et le détail d'une liste de pièces 
   * @param idListePieces : Identifiant de la liste de pièce à récupérer
   */
  getListPieces(idListePiece: number): Observable<any> {
    //TO DO : Appel web service pour récupérer le contenu d'une liste de pièce
    // A adapeter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
      .get("resources/tmp/_tmp_liste_pieces.json", { headers: headers });
  }

  getListStructure(idListeStructure: number) {
    //TO DO : Appel web service pour récupérer le contenu d'une liste structure
    // A adapeter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
      .get("resources/tmp/_tmp_liste_structure.json", { headers: headers });
  }

  /**
    * Méthode générique pour récupérer une liste (code/libellé)
    * @param listName : Nom de la liste pour récupérer le contexte correspondant
    */
  getList(listName: string) {
    // Génération du corps de la requête
    /*const body: string = JSON.stringify({
      contexte:       this.waliste.contexte[listName],
    });

    const url = this.mixinService.getApiUrl() + this.waliste.url;
    return this.sendWebService(body,url);*/
    return this.http.get("resources/tmp/_tmp_type_plan.json");
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
