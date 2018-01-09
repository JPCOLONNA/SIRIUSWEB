import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MixinService } from 'app/core/providers/mixin.service';

@Injectable()
export class PythieService {

  constructor(private http: HttpClient, private mixinService : MixinService) { }

  /**
   * Récupère les données d'une branche CP
   */
  getConditionsParticulieres(): Observable<any> {
    //TO DO Appel web services pour récupérer les informations de la branche CP concernant l'assuré
    // A adapeter à l'appel de service (methode post, body et header)
    let headers = this.mixinService.getDefaultHeaders();
    return this.http
        .get("resources/tmp/_tmp_brancheCP.json", { headers: headers });
            
  }

}
