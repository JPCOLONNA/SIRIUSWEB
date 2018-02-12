import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-branche-cp',
  templateUrl: './plan-branche-cp.component.html',
  styleUrls: ['./plan-branche-cp.component.scss']
})
export class PlanBrancheCpComponent implements OnInit {

  /** ---------------------- Pour la génération du menu -------------------- */
  /** Plan dont le détail est à afficher sous forme de tableau, (donnée du plan + libellé des données) */
  objet: any;
  /** Nom de l'identifiant pour l'affichage du menu */
  nameIdMenu: string = 'idPlan'
  /** Conditions d'affichage du menu */
  conditionsMenu:Array<String>;

  constructor() { }

  ngOnInit() {
    console.log(this.objet);
  }

}
