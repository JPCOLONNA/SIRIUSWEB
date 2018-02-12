import { Component, OnInit } from '@angular/core';
import { ResourcesService } from 'app/core/providers/resources.service';
import { ResourcesPythieService } from 'app/pythie/providers/resources-pythie.service';
import { Router } from '@angular/router';
import { Plan } from 'app/pythie/models/plan';
import { Observable } from 'rxjs/Observable';
import { PythieService } from 'app/pythie/providers/pythie.service';
import { BrancheCP } from 'app/pythie/models/brancheCP';
import { NotificationsService } from 'app/core/providers/notifications.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;

  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources de l'application PYTHIE */
  rscPythie: any;
  /** Ressources spécifique à l'écran : Liste de plans */
  rscPlanDetail: any;

  /** Plan dont le détail est à afficher */
  objet: any;     //Initier par le composant parent lors du chargement du composant (router-outlet)
  /** Identifiant du plan */
  idPlan: number  

  /** Informations générales du plan */
  infosPlan: any;

  /** Liste des branches CConditions particulières (CP) */
  branchesCPList: Array<BrancheCP>;

  /** Nom de l'écran du détail du plan à afficher. <br/>
   * <i><u>Valeurs :</u><br/>
   * informations => Information générales (par défaut) <br/>
   * branchesCPlist => Listes des branches CP du plan</i> */
   screen: string;

  constructor(
    private resourcesService: ResourcesService,
    private resourcesPythieService: ResourcesPythieService,
    private pythieService: PythieService,
    private notificationsService: NotificationsService,
    private router: Router) { }

  /**
   * Initialise le composant et ses variables
   */
  ngOnInit() {
    this.rsc = this.resourcesService.get();
    this.rscPythie = this.resourcesPythieService.get();
    this.rscPlanDetail = this.rscPythie.planDetail;

    this.screen = '';

    //Objet de type plan reçu en paramètre via router-outlet
    if (this.objet == undefined)
      this.router.navigate(['/pythie/plan-liste']);
    else {
      this.idPlan = Number(this.objet);
      //Si l'identifiant plan n'est pas connu, redirection vers la recherche d'un plan
      if (this.idPlan == 0 || this.idPlan == null)
        this.router.navigate(['/pythie/plan-liste']);
    }

    this.getInfoEcran();
  }

  /**
   * Récupère toutes les informations de l'écran, toutes les informations de chaque branches
   */
  getInfoEcran() {
    
    Observable.forkJoin(
      this.pythieService.getPlan(this.idPlan),
      this.pythieService.getListConditionsParticulieres(this.idPlan)
    ).subscribe(result => {   
      
      // ---------------- Plan ---------------
      this.infosPlan = JSON.parse(JSON.stringify(result[0]));

      // ------------ Branche CP -------------
      let resultBrancheCP = JSON.parse(JSON.stringify(result[1]));
      this.branchesCPList = new Array<BrancheCP>();
      
      //TO DO if (resultBrancheCP.hasOwnProperty('success') && resultBrancheCP.success === 'true') {
        for(let brancheCP of resultBrancheCP.liste_branche_CP)
        {
          this.branchesCPList.push(new BrancheCP(brancheCP));
        }
      /*} else {
        this.notificationsService.displayErrorAPI(resultBrancheCP.info);
      }*/
      this.isRequesting = false;
    });
  }

  /**
   * Change le nom d'écran à afficher dans le détail d'un plan
   * @param screen Nom de l'écran à afficher
   */
  onChangeScreen(screen: string) {
    this.screen = screen;
  }

}
