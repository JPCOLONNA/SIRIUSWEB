import { Component, OnInit } from '@angular/core';
import { ResourcesService } from 'app/core/providers/resources.service';
import { ResourcesPythieService } from 'app/pythie/providers/resources-pythie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {

  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources de l'application PYTHIE */
  rscPythie: any;

  /** Identifiant du plan dont le détail est à afficher */
  idPlan: number;     //Initier par le composant parent lors du chargement du composant (router-outlet)

  constructor(
    private resourcesService: ResourcesService,
    private resourcesPythieService: ResourcesPythieService,
    private router: Router) { }

  /**
   * Initialise le composant et ses variables
   */
  ngOnInit() {
    this.rsc = this.resourcesService.get();
    this.rscPythie = this.resourcesPythieService.get();

    //Si l'identifiant plan n'est pas connu, redirection vers la recherche d'un plan
    if (this.idPlan == 0 || this.idPlan == null)
      this.router.navigate(['/pythie/plan-liste']);
  }

}
