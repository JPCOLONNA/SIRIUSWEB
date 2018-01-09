import { Component, OnInit } from '@angular/core';
import { MenuEvent } from '../../../core/broadcast/menu-event';

import { isUndefined, log } from 'util';

/**
 * Menu de navigation principal
 */
@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.scss']
})
export class MenuNavigationComponent implements OnInit {

  /** Contenu du menu */
  menu: any;

  /**
   * Créer une instance du composant MenuNavigationComponent
   * @param menuEvent   Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   */
  constructor(
    private menuEvent: MenuEvent) { 

  }

  /**
   * Initialise le composant MenuNavigationComponent et ses variables
   * Récupère le contenu du menu reçu via un évènement MenuEvent
   */
  ngOnInit() {
    //Récupération du menu
    this.menuEvent.on().subscribe((res) => {
      if(res != "")
        this.menu = JSON.parse(res);
      else 
        this.menu = "";
    });
  }

}
