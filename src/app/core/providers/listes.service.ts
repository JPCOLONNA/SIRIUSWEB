import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';

@Injectable()
export class ListesService {

  constructor(private http: HttpClient, private mixinService: MixinService) { }

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

  getListStructure(idListeStructure:number)
  {
    //TO DO : Appel web service pour récupérer le contenu d'une liste structure
    // A adapeter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
        .get("resources/tmp/_tmp_liste_structure.json", { headers: headers });
  }

}
