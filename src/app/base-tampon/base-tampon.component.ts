import { Component, OnInit, ViewChild  }  from '@angular/core';
import { ResourcesBaseTamponService }     from './providers/resources-base-tampon.service';
import { MenuEvent }                      from '../core/broadcast/menu-event';
import { ApplicationInfoEvent }           from '../core/broadcast/application-info-event';
import { MixinService }                   from '../core/providers/mixin.service';
import { ConstructionMenuService }        from '../core/providers/construction-menu.service';
import { AutorisationService }            from 'app/core/providers/autorisation.service';

@Component({
  selector: 'app-base-tampon',
  templateUrl: './base-tampon.component.html',
  styleUrls: ['./base-tampon.component.scss']
})
export class BaseTamponComponent implements OnInit {

   /** Ressources "BASE TAMPON" */
  rscBaseTampon: any; 
 
  /** Identifiant de l'assuré sélectionné dans la liste */
  idStockage:number;
  idEvt:number;


  /**
   * Créer une instance du composant AssuresComponent<br />
   * Récupère le contenu du menu 
   * @param mixinService                Services généraux
   * @param menuEvent                   Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   * @param constructionMenuService     Construit le menu selon les droits et la présence d'un identifiant ou non
   * @param applicationInfoEvent        Informations de l'application reçues via un evènement (chargement d'écran)
  */
  constructor(
    private resourcesBaseTamponService: ResourcesBaseTamponService,
    private mixinService: MixinService,
    private menuEvent: MenuEvent,
    private constructionMenuService : ConstructionMenuService,
    private applicationInfoEvent: ApplicationInfoEvent,
    private autorisationService:AutorisationService

  ) { }

  ngOnInit() {
    //Ressources de l'application
    this.rscBaseTampon = this.resourcesBaseTamponService.get();
    
    //MAJ du menu
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscBaseTampon.menu, false)));
    
    //MAJ du nom de l'application
    this.applicationInfoEvent.fire(JSON.stringify(this.rscBaseTampon.infoApplication));

    //Chargement des droits de l'application en session
    this.autorisationService.getListDroitsApplication(this.rscBaseTampon.infoApplication.code);

    this.idStockage = 0;
  }

  /**
   * Methode appelée à l'initialisation du composant enfant via router-outlet<br />
   * Permet de transférer des valeurs de parent ==> enfant
   * @param  $event Composant enfant
   */
  componentAdded($event)
  {
    //transfert l'id stockage dont le détail est à afficher
    $event.idStockage = this.idStockage;
    $event.idEvt = this.idEvt;
  }

  /**
   * Methode appelée à la fermeture du composant enfant via router-outlet<br />
   * Permet de transférer des valeurs d'enfant ==> parent
   * @param  $event composant enfant
   */
  componentRemoved($event)
  {
    //Chargement du menu en précisnt qu'il y a un identifiant de connu pour activer les liens nécessitants un identifiant
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscBaseTampon.menu, true)));
       
    //Récupère l'id stockage dont le détail est à afficher
    this.idStockage = $event.idStockage;
    this.idEvt = $event.idEvt;
  }

}
