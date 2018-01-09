import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MixinService } from './mixin.service';

@Injectable()
export class AutorisationService {

  listeActions: any;
  constructor(private http: HttpClient, private mixinService: MixinService) { }

  getAutorisationUtil(user: string)
  {
    //TO DO : Appel du webservices avec Contexte=GetDroitsGestionnaire pour réupérer la liste des écrans avec les droits utilisateurs
    let headers = this.mixinService.getDefaultHeaders();
    
    return new Promise(resolve => {
        this.http
            .get("resources/tmp/_tmp_liste_droits.json", { headers: headers })
            .subscribe(
              (rsc) => {
                //Cast le résultat de type "object" en structure JSON
                let rscTmp = JSON.parse(JSON.stringify(rsc))

                this.listeActions = rscTmp.liste_droits;
                //sauvegarde la liste des droits
                this.mixinService.storeInSession("actions",rscTmp.liste_droits);
                resolve(true);
              },
              (error) => console.log(error)
            );
    });
    
  }

  getAutorisationEcran(ecran: string)
  {
    //Récupère en session la liste des actions possibles pour l'utilisateur
    this.listeActions = JSON.parse(this.mixinService.getFromSession("actions"));
    this.listeActions.forEach(element => {      
      if(element.ecran == ecran)
      {
        console.log(element.autorisations);
        return element.autorisations;
      }
    });
  }

  isAutorise(ecran: string, droit: string)
  {
    let retour = false;

    //Récupère en session la liste des actions possible pour l'utilisateur
    //!! cast en boolean le résultat 0/1
    this.listeActions = JSON.parse(this.mixinService.getFromSession("actions"));
    this.listeActions.forEach(element => {
      if(element.ecran == ecran)
      { 
        switch(droit) { 
          case "executer": { 
             retour = !!element.autorisations.executer;
             break;
          } 
          case "creer": { 
            retour = !!element.autorisations.creer; 
            break;
          } 
          case "modifier": { 
            retour = !!element.autorisations.modifier; 
            break;
          } 
          case "supprimer": { 
            retour = !!element.autorisations.supprimer; 
            break;
          }
          case "exporter": { 
            retour = !!element.autorisations.exporter; 
            break;
          } 
       } 
       return false;
      }
    });
    return retour;
  }

}
