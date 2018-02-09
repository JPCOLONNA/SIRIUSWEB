import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Plan } from 'app/pythie/models/plan';
import { Router,ActivatedRoute } from '@angular/router';
import { PythieService } from 'app/pythie/providers/pythie.service';
import { MatDialog } from '@angular/material';
import { ModalFormulairePlanComponent } from 'app/pythie/components/plan/modal-formulaire-plan/modal-formulaire-plan.component';
import { ResourcesPythieService } from 'app/pythie/providers/resources-pythie.service';
import { ResourcesService } from 'app/core/providers/resources.service';
import { AutorisationService } from 'app/core/providers/autorisation.service';



@Component({
  selector: 'app-plan-informations',
  templateUrl: './plan-informations.component.html',
  styleUrls: ['./plan-informations.component.scss']
})
export class PlanInformationsComponent implements OnInit {
  
  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = false;

  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources du composant */
  rscPlanInfo: any;

  /** Données du plan à afficher + libellé des données (label) */
  @Input() infosPlan:any;

  /** Libellé des champs de saisie */
  label: any;

  /** Les données du plan  */
  plan: Plan;

  /** Plan communiqué au composant (mise à jour) */
  @Output() objet = new EventEmitter<any>();

  constructor(
    private pythieService: PythieService,
    private resourcesService : ResourcesService,
    private resourcesPythieService:ResourcesPythieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private autorisationService: AutorisationService) { }

  ngOnInit() {
    this.rsc = this.resourcesService.get();
    this.rscPlanInfo = this.resourcesPythieService.get().planInfos;
    //Converti les infos reçues de string en JSON 
    if(this.infosPlan != undefined)
    {
    this.infosPlan = JSON.parse(this.infosPlan);
    this.plan = new Plan (this.infosPlan[0]);
    this.label = this.infosPlan[1];   
    }
  }

  /**
   * Modification d'un plan : affiche le formulaire de modification d'un plan dans une modale
   */
  updatePlan() {
    //Chargement de la modale, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalFormulairePlanComponent, {
      data: {
        route: this.activatedRoute,
        mode: "update",
        idPlan: this.plan.id_plan
      },
      autoFocus: false,
      disableClose: true
    });

    //lors de la fermeture de la modale
    dialogRef.afterClosed().subscribe(result => {
      //Actualise l'affichage des donénées du plan
      this.getInfoPlan();
    });
  }

  /**
   * Récupère les informations d'un plan
   */
  getInfoPlan()
  {
    this.isRequesting = true;
    //TO DO Appel d'API pour récupérer les données d'un plan
    this.pythieService.getPlan(this.plan.id_plan).subscribe(data => {
      
      //TO DO if (data.hasOwnProperty('success') && data.success === 'true') {
        this.plan = new Plan(data.detail_plan);
        this.label = data.libelle;
        //mettre à jour l'objet plan qui circule entre composant
        let paramTmp = Array();
        paramTmp.push(this.plan);
        paramTmp.push(this.label);
        this.objet.emit(JSON.stringify(paramTmp));
      /*} else {
        this.notificationsService.displayErrorAPI(data.info);
      }*/
      this.isRequesting = false;
    });
  }

}
