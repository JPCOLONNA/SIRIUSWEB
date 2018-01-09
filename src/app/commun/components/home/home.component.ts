import { Component, OnInit } from '@angular/core';
import { MenuEvent } from '../../../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../../../core/broadcast/application-info-event';
import { ResourcesService } from '../../../core/providers/resources.service';
import { MixinService } from '../../../core/providers/mixin.service';
import { Router } from '@angular/router';

/**
 * Liste les applications sous forme de bouton 
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Créer une instance du composant HomeComponent
   * @param resourcesService      Services de ressources pour toute les applications
   * @param mixinService          Services généraux
   * @param menuEvent             Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   * @param applicationInfoEvent  Informations de l'application reçues via un evènement (chargement d'écran)
   * @param router 
   */
  constructor(private resourcesService: ResourcesService,
    private mixinService: MixinService,
    private menuEvent: MenuEvent, 
    private applicationInfoEvent: ApplicationInfoEvent,
    private router: Router) { }

  /**
   * Initialise le composant HomeComponent<br />
   * Initialise le menu => vide<br />
   * Initialise les informations de l'application => vide
   */
  ngOnInit() {
    //MAJ du menu - aucun menu car aucune application sélectionnée
    this.menuEvent.fire("");
    //MAJ du nom de l'application - aucun information d'application car aucune application sélectionnée
    this.applicationInfoEvent.fire("");
  }

  /**
   * Redirige l'utilisateur vers l'application sélectionnée, change l'url du navigateur 
   * @param lien      Url de l'application
   */
  redirectTo(lien: string)
  {
    this.router.navigate([lien]);
  }

}
