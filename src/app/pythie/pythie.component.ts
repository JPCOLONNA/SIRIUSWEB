import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesPythieService } from './providers/resources-pythie.service';
import { MixinService } from '../core/providers/mixin.service';
import { ResourcesService } from '../core/providers/resources.service';
import { MenuEvent } from '../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../core/broadcast/application-info-event';
import { ConstructionMenuService } from 'app/core/providers/construction-menu.service';

@Component({
  selector: 'app-pythie',
  templateUrl: './pythie.component.html',
  styleUrls: ['./pythie.component.scss']
})
export class PythieComponent implements OnInit {

  //Ressources
  rscPythie: any; 

  objet:any;

  constructor(
    private resourcesPythieService: ResourcesPythieService, 
    private resourcesService: ResourcesService, 
    private mixinService: MixinService, 
    private formBuilder: FormBuilder,
    private menuEvent: MenuEvent,
    private applicationInfoEvent: ApplicationInfoEvent,
    private constructionMenuService: ConstructionMenuService) { 
  }

  ngOnInit() {
    this.rscPythie = this.resourcesPythieService.get();
    

    //MAJ du menu
    this.menuEvent.fire(JSON.stringify(this.rscPythie.menu));
    
    //MAJ du nom de l'application
    this.applicationInfoEvent.fire(JSON.stringify(this.rscPythie.applicationInfo));
  }

  /**
   * Methode appelée à l'initialisation du composant enfant via router-outlet<br />
   * Permet de transférer des valeurs de parent ==> enfant
   * @param  $event Composant enfant
   */
  componentAdded($event)
  {
    //transfert l'id assuré à afficher
    $event.objet = this.objet;
  }

  /**
   * Methode appelée à la fermeture du composant enfant via router-outlet<br />
   * Permet de transférer des valeurs d'enfant ==> parent
   * @param  $event composant enfant
   */
  componentRemoved($event)
  {
    //Chargement du menu en précisnt qu'il y a un identifiant de connu pour activer les liens nécessitants un identifiant
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscPythie.menu, true, $event.nameIdMenu, $event.conditionsMenu)));
    
    //Récupère l'objet à afficher
    this.objet = $event.objet;
  }
}
