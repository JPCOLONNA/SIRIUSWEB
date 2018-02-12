import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesPythieService } from 'app/pythie/providers/resources-pythie.service';
import { ResourcesService } from 'app/core/providers/resources.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MixinService } from 'app/core/providers/mixin.service';
import { Observable } from 'rxjs/Observable';
import { ListService } from 'app/core/providers/list.service';
import { ExceptionService } from 'app/core/providers/exception.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MenuEvent } from 'app/core/broadcast/menu-event';
import { ConstructionMenuService } from 'app/core/providers/construction-menu.service';
import { PythieService } from 'app/pythie/providers/pythie.service';
import { NotificationsService } from 'app/core/providers/notifications.service';
import { Plan } from 'app/pythie/models/plan';
import { Router } from '@angular/router';
import { ElementList } from 'app/core/models/ElementList';
import { ActivatedRoute } from '@angular/router';
import { ModalFormulairePlanComponent } from '../modal-formulaire-plan/modal-formulaire-plan.component';
import { AutorisationService } from 'app/core/providers/autorisation.service';
import { ModalConfirmComponent } from 'app/commun/components/modal-confirm/modal-confirm.component';

/** Recherche d'un plan de paramétrage PYTHIE, résulats sous forme de liste. */
@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequestingSearch = false;
  isRequesting = false;

  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources de l'application PYTHIE */
  rscPythie: any;
  /** Ressources spécifique à l'écran : Liste de plans */
  rscPlanList: any;

  // --------------------- Formulaire -----------------------
  /** Nom du formulaire de recherche */
  formSearchPlan: FormGroup;
  /** Validateurs du formulaire pre-définis */
  validators: any;
  /** Masques de saisie pre-définis */
  mask: any;

  // ----------------- Tableau d'assurés ---------------------
  /** Entêtes du tableau des assurés */
  labelTable: any;
  /** Liste des assurés trouvés, à afficher */
  listPlan: Array<Plan>;
  /** Liste des colonnes du tableau des assurés à afficher */
  displayedColumns: any;
  /** Données du tableau : "listAssures" au format datasource */
  dataSource: MatTableDataSource<any>;
  /** Pagination du tableau */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Tris sur les entêtes de colonne */
  @ViewChild(MatSort) sort: MatSort;

  /** Liste des types de plan */
  listTypePlan: Array<ElementList>;

  /** ---------------------- Pour la génération du menu -------------------- */
  /** Plan sélectionné transférer via le router-outlet */
  objet: any;
  /** Nom de l'identifiant pour l'affichage du menu */
  nameIdMenu: string = 'idPlan'
  /** Conditions d'affichage du menu */
  conditionsMenu:Array<String>;

  /**
   * Crée une instance de PlanListComponent
   * @param resourcesService 
   * @param resourcesPythieService 
   * @param formBuilder 
   * @param mixinService 
   * @param listService 
   * @param exceptionService 
   * @param menuEvent 
   * @param constructionMenuService 
   * @param pythieService 
   * @param notificationsService 
   * @param router 
   */
  constructor(
    private resourcesService: ResourcesService,
    private resourcesPythieService: ResourcesPythieService,
    private formBuilder: FormBuilder,
    private mixinService: MixinService,
    private listService: ListService,
    private exceptionService: ExceptionService,
    private menuEvent: MenuEvent,
    private constructionMenuService: ConstructionMenuService,
    private pythieService: PythieService,
    private notificationsService: NotificationsService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private autorisationService: AutorisationService) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources
   */
  ngOnInit() {

    //Spinner le temps de chargement du module de recherche
    this.isRequestingSearch = true;

    //Ressources
    this.rsc = this.resourcesService.get();
    this.rscPythie = this.resourcesPythieService.get();
    this.rscPlanList = this.rscPythie.planList;
    this.validators = this.mixinService.getValidators();
    this.mask = this.mixinService.getMasks();

    //Réinitialise l'identifiant du plan et le menu 
    this.objet = new Plan("");
    //Chargement du menu en précisnt qu'il n'y a pas d'identifiant de plan de connu pour désactiver les liens nécessitants un identifiant
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscPythie.menu, false)));

    //Récupère la liste de type de plan
    this.listTypePlan = new Array<ElementList>();
    this.listService.getList("typePlan").subscribe((data) => {
      /*if (data.hasOwnProperty('success') && data.success === 'true') {*/
      //tmp JSON.PARSE...
      for (let element of JSON.parse(JSON.stringify(data)).liste) { this.listTypePlan.push(new ElementList(element)); }

      //Création du formulaire
      this.createForm();
      this.isRequestingSearch = false;
    },
      (error) => this.exceptionService.handleException(error)
    );

  }

  /**
   * Création du formulaire de recherche de plan
   */
  createForm(): void {
    this.formSearchPlan = this.formBuilder.group({
      'typePlan': [''],
      'nom': [''],
      'dateDebut': ['', this.validators.date],
      'dateFin': ['', this.validators.date]
    });
  }

  /**
   * Soumission du formulaire de recherche d'un plan
   */
  onSubmit() {

    //si le formulaire est valide
    if (this.formSearchPlan.valid) {

      //S'il y au au moins un champs de renseigné
      if (this.controlFormInputFilled()) {

        //Spinner sur la liste le temps de la recherche
        this.doneRequesting(true);

        //Converti le format de la date
        if (this.formSearchPlan.value.dateDebut != "")
          this.formSearchPlan.value.dateDebut = this.mixinService.parseDate8(this.formSearchPlan.value.dateDebut);
        if (this.formSearchPlan.value.dateFin != "")
          this.formSearchPlan.value.dateFin = this.mixinService.parseDate8(this.formSearchPlan.value.dateFin);

        this.pythieService.getListPlan(this.formSearchPlan.value)
          .subscribe(
          (data) => {
            /* TO DO APPEL DE SERVICE 
            if (data.hasOwnProperty('success') && data.success === 'true') {    */
            //Libellé des colonnes du tableau
            this.labelTable = data.libelle;

            //Liste des plans
            this.listPlan = new Array<Plan>();
            for (let plan of data.liste_plans) { this.listPlan.push(new Plan(plan)); }
            //Ordre des colonnes
            this.displayedColumns = ['typePlan', 'nom', 'description', 'dateDebut', 'dateFin', 'actif', 'actions'];
            //Données du tableau
            this.dataSource = new MatTableDataSource<any>(this.listPlan);
            //Configuration de la pagination
            this.dataSource.paginator = this.paginator;
            //Configuration du tri sur les colonnes
            this.dataSource.sort = this.sort;
            /*} else {
              this.exceptionService.handleException(data).subscribe(() => {}, (error) => {
                this.notificationsService.displayError(error);
              });
            }*/
            this.doneRequesting(false);
          },
          (error) => {
            this.notificationsService.displayError(error);
          }
          );
      }
    }
    else {
      this.notificationsService.displayError("Champs du formulaire de recherche mal renseignés");
    }
  }

  /**
   * Lors de la sélection d'un plan, transfer via router-outlet les donénes du plan sélectionné et les libellés dans données
   */
  selectPlan(plan: Plan) {
    //construit le JSOn à transmettre au autre composant enfant : donnée (plan sélectionné) + libelle
    let paramTmp = new Array();
    paramTmp.push(plan);
    paramTmp.push(this.labelTable);
    this.objet = JSON.stringify(paramTmp);
   
    // L'affichage le contenu du menu dépend des branches du plans */
    this.conditionsMenu = Array<String>();
    //TO DO Récupérer les codes des branches du plan à reporter dans items de puthie_ressources.jso,
    this.conditionsMenu.push("brancheCP");
    this.router.navigate(['/pythie/plan-critereApplication']);
  }


  /**
   * Ajout d'un plan : Affiche le formulaire d'ajout d'un plan dans une modal
   */
  addPlan() {
    //Chargement de la modal, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalFormulairePlanComponent, {
      data: { route: this.activatedRoute },
      autoFocus: false,
      disableClose: true
    });

    //lors de la fermeture de la modale
    dialogRef.afterClosed().subscribe(result => {
      //Actualise la liste
      this.onSubmit();
    }
    );
  }

  /**
   * Modifcation d'un plan : affiche le formulaire de modification d'un plan dans une modale
   */
  updatePlan(plan: Plan) {
    //Chargement de la modale, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalFormulairePlanComponent, {
      data: {
        route: this.activatedRoute,
        mode: "update",
        idPlan: plan.id_plan
      },
      autoFocus: false,
      disableClose: true
    });

    //lors de la fermeture de la modale
    dialogRef.afterClosed().subscribe(result => {
      //Actualise la liste
      this.onSubmit();
    }
    );
  }

  /**
   * Suppression d'un plan : affiche un message de confirmation
   * @param plan : Objet contenant les informations du plan
   */
  deletePlan(plan:Plan) {
    //Demande de confirmation de suppression
    let dialogRefConfirm = this.dialog.open(ModalConfirmComponent, {
      data: { 
        question: this.rsc.message.deleteConfirm,
        additionalMessage : "Plan : " + plan.nom + " - " + plan.description
       },
      autoFocus: false,
      disableClose: true
    });

    //A la fermeture de la modale
    dialogRefConfirm.afterClosed().subscribe(val => {
      //si l'utilsiateur à confirmer la fermeture de la modal
      if (val == true)
      {
        //TO DO - Appel de l'api pour supprimer et rafraichi la recherche
        /*this.pythieService.deletePlan(plan.id_plan).subscribe(data =>
        {
          //La suppression c'est bien passée
          if (data.hasOwnProperty('success') && data.success === 'true') {
            this.notificationsService.displaySuccessAPI(data.info);*/
            this.notificationsService.displaySuccessAPI(JSON.parse('{"libelle":"Suppression effectuée"}'));
            this.onSubmit();
          /*}
          else{
            //Une erreur lors de la supression
            this.notificationsService.displayErrorAPI(data.info);
          }
          
        });*/
      }
    });
  }

  duplicatePlan(plan:Plan)
  {
    //Chargement de la modale, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalFormulairePlanComponent, {
      data: {
        route: this.activatedRoute,
        mode: "duplicate",
        idPlan: plan.id_plan
      },
      autoFocus: false,
      disableClose: true
    });

    //lors de la fermeture de la modale
    dialogRef.afterClosed().subscribe(result => {
      //Actualise la liste
      this.onSubmit();
    }
    );
  }

  /**
   * Change l'état de la page "en chargement"(false) <==> "affichée"(true)
   */
  doneRequesting(value?: boolean) {
    if (value != null)
      this.isRequesting = value;
    else if (this.isRequesting)
      this.isRequesting = false;
    else
      this.isRequesting = true;
  }

  /**
   * Controle s'il y a un des champs du formulaire de renseigné
   */
  controlFormInputFilled() {
    let isValueFilled = false;

    //Pour chaque input possédant un formControl, on vérifie s'il y a une donnée
    for (let valueInput in this.formSearchPlan.controls) {
      if (this.formSearchPlan.get(valueInput).value != "")
        return true;
    }

    return isValueFilled;
  }
}
