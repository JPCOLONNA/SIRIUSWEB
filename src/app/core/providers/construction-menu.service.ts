import { Injectable } from '@angular/core';
import { AutorisationService } from './autorisation.service';

@Injectable()
export class ConstructionMenuService {

  constructor(private autorisationService:AutorisationService) { }
  /**
     * Construit le menu selon les droits de l'utilisateur et si le lien demande la présence d'un id
     * @param jsonMenu  Contenu JSON du menu initial
     * @param idExist   True si l'id existe et que l'affichage des menus comprenant l'id est souhaité
     * @param nameId    Nom de l'identifiant souhaité (ex idAssure, idPlan,...)
     */
    constructionMenuNavigation(jsonMenu: any, idExist?: boolean, nameId?: string)
    {
        jsonMenu.items.forEach(item => {
            //si le lien nécessite l'identifiant on vérifie si l'identifiant existe et controle le droit d'accès
            //TO DO if(((item.id == true && idExist == true) || item.id == false) && this.autorisationService.isAutorise(item.nameScreen, "executer"))
            //(item.idNecessary == true && idExist == true) || 
            if(item.idNecessary == undefined || item.idNecessary == false || (idExist == true && (item.idNecessary == true || item.idNecessary == nameId)))
              item.isActif = true;
            else
              item.isActif = false;                
        });
        
        return jsonMenu;
    }

}
