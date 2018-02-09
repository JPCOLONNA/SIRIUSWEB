import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourcesPythieService } from 'app/pythie/providers/resources-pythie.service';

@Component({
  selector: 'app-plan-criteres-application',
  templateUrl: './plan-criteres-application.component.html',
  styleUrls: ['./plan-criteres-application.component.scss']
})
export class PlanCriteresApplicationComponent implements OnInit {

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;

  // --------------------- Ressources -----------------------
  /** Ressources spécifique à l'écran : Liste de plans */
  rscPlanCritApp: any;

  
  /** ---------------------- Pour la génération du menu -------------------- */
  /** Plan dont le détail est à afficher sous forme de tableau, (donnée du plan + libellé des données) */
  objet: any;
  /** Nom de l'identifiant pour l'affichage du menu */
  nameIdMenu: string = 'idPlan'
  /** Conditions d'affichage du menu */
  conditionsMenu:Array<String>;
  

  constructor(
    private resourcesPythieService:ResourcesPythieService,
    private router: Router) { }


  ngOnInit() {
    //Si l'identifiant plan n'est pas connu, redirection vers la recherche d'un plan
    if (this.objet == undefined || this.objet == '' || this.objet == 0)
      this.router.navigate(['/pythie/plan-liste']);    
    
    this.rscPlanCritApp = this.resourcesPythieService.get().planCritereApplication;

    //TO DO Appel service pour récupérer la liste des critères d'application
    this.isRequesting = false;
  }

  /** Récupère et actualise le plan communiquer au différent composant */
  onChangeObjet($event)
  {
    this.objet = $event;
  }

}
