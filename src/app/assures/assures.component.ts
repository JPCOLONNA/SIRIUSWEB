import { Component, OnInit,ViewChild }  from '@angular/core';
import { ResourcesAssuresService }      from './providers/resources-assures.service';
import { MenuEvent }                    from '../core/broadcast/menu-event';
import { ApplicationInfoEvent }         from '../core/broadcast/application-info-event';
import { MixinService }                 from '../core/providers/mixin.service';
import { SearchAssureComponent }        from './components/search-assure/search-assure.component';
import { ConstructionMenuService }      from '../core/providers/construction-menu.service';

/**
 * Composant principal de l'application "ASSURES"<br />
 * Porte d'entrée de l'application "ASURES"
 */
@Component({
  selector: 'app-assures',
  templateUrl: './assures.component.html',
  styleUrls: ['./assures.component.scss']
})
export class AssuresComponent implements OnInit {

  /** Ressources "ASSURES" : label de l'application "ASSURE"<br /> Fichier : resources/_assures-resources.json */
  rscAssures: any; 
 
  /** Identifiant de l'assuré sélectionné dans la liste */
  idAssure:number;

  /**
   * Créer une instance du composant AssuresComponent<br />
   * Récupère le contenu du menu 
   * @param resourcesAssuresService     Services de ressources pour l'application "ASSURES"
   * @param mixinService                Services généraux
   * @param menuEvent                   Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   * @param constructionMenuService     Construit le menu selon les droits et la présence d'un identifiant ou non
   * @param applicationInfoEvent        Informations de l'application reçues via un evènement (chargement d'écran)
   */
  constructor(
    private resourcesAssuresService: ResourcesAssuresService,
    private mixinService: MixinService,
    private menuEvent: MenuEvent,
    private constructionMenuService : ConstructionMenuService,
    private applicationInfoEvent: ApplicationInfoEvent
  ) { }

  /**
   * Initialise le composant AssuresComponent et de ses variables<br />
   * Récupère les ressources<br />
   * Renseigne les informations de l'application/écran<br />
   * Construit le menu
   */
  ngOnInit() {
    //Ressources de l'application
    this.rscAssures = this.resourcesAssuresService.get();
    
    //MAJ du menu
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscAssures.menu, false)));
    
    //MAJ du nom de l'application
    this.applicationInfoEvent.fire(JSON.stringify(this.rscAssures.applicationInfo));

    this.idAssure = 0;

  }

  /**
   * Methode appelée à l'initialisation du composant enfant via router-outlet<br />
   * Permet de transférer des valeurs de parent ==> enfant
   * @param  $event Composant enfant
   */
  componentAdded($event)
  {
    //transfert l'id assuré à afficher
    $event.idAssure = this.idAssure;
  }

  /**
   * Methode appelée à la fermeture du composant enfant via router-outlet<br />
   * Permet de transférer des valeurs d'enfant ==> parent
   * @param  $event composant enfant
   */
  componentRemoved($event)
  {
    //Chargement du menu en précisnt qu'il y a un identifiant de connu pour activer les liens nécessitants un identifiant
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscAssures.menu, true)));
       
    //Récupère l'id assuré à afficher
    this.idAssure = $event.idAssure;
  }

}
