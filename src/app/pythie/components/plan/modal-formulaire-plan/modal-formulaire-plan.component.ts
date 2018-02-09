import { Component, OnInit, Inject } from '@angular/core';
import { ResourcesService } from 'app/core/providers/resources.service';
import { ResourcesPythieService } from 'app/pythie/providers/resources-pythie.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementList } from 'app/core/models/ElementList';
import { ListService } from 'app/core/providers/list.service';
import { ExceptionService } from 'app/core/providers/exception.service';
import { MixinService } from 'app/core/providers/mixin.service';
import { ModalConfirmComponent } from 'app/commun/components/modal-confirm/modal-confirm.component';
import { PythieService } from 'app/pythie/providers/pythie.service';
import { NotificationsService } from 'app/core/providers/notifications.service';
import { Observable } from 'rxjs/Observable';
import { DateYMDPipe } from 'app/shared/pipes/dateYMD.pipe';

@Component({
  selector: 'app-modal-formulaire-plan',
  templateUrl: './modal-formulaire-plan.component.html',
  styleUrls: ['./modal-formulaire-plan.component.scss']
})
export class ModalFormulairePlanComponent implements OnInit {

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;

  /** Ressources spécifique à l'écran */
  rscPythieModal: any;

  /** Mode d'affichage du formulaire : add, update ou duplicate */
  mode: string = "add";

  /** Titre de la modale */
  titleModal: string;

  /** Nom de la modale */
  nameModal: string;

  /** Identifiant du plan en modification. En ajout, idPlan = 0 */
  idPlan: number;

  // --------------------- Formulaire -----------------------
  /** Nom du formulaire de recherche */
  formPlan: FormGroup;
  /** Validateurs du formulaire pre-définis */
  validators: any;
  /** Masques de saisie pre-définis */
  mask: any;
  /** Label des champs : placeholder */
  labelInput: any;

  /** Flag pour savoir si le formulaire a été modifié, touché même si la donnée est extacte */
  formUpdated: boolean = false;

  /** Liste de types plans */
  listTypePlan: Array<ElementList>;

  /** Données d'intitalisation du formulaire */
  dataFormInit: any;

  /**
   * Crée une instance de ModalFormulairePlanComponent
   * @param resourcesService 
   * @param resourcesPythieService 
   * @param formBuilder 
   * @param listService 
   * @param exceptionService 
   * @param mixinService 
   * @param data 
   * @param dialogRef 
   */
  constructor(private resourcesService: ResourcesService,
    private resourcesPythieService: ResourcesPythieService,
    private formBuilder: FormBuilder,
    private listService: ListService,
    private exceptionService: ExceptionService,
    private mixinService: MixinService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalFormulairePlanComponent>,
    private pythieService: PythieService,
    private notificationsService: NotificationsService) { }

  /**
   * Initialise le composant et ses variables
   * Appel la création du formulaire
   */
  ngOnInit() {
    this.rsc = this.resourcesService.get();
    this.rscPythieModal = this.resourcesPythieService.get().modalFormulairePlan;
    this.validators = this.mixinService.getValidators();
    this.mask = this.mixinService.getMasks();

    //mode d'affichage du formulaire add par défaut ou update ou duplicate
    if (this.data.mode != undefined && this.data.mode != "") {
      this.mode = this.data.mode;
      this.idPlan = this.data.idPlan;
      if (this.mode == 'update')
        this.titleModal = this.rscPythieModal.titleModalModif;
      if (this.mode == 'duplicate')
        this.titleModal = this.rscPythieModal.titleModalAjout;
    }
    else {
      this.mode = "add";
      this.idPlan = 0;
      this.titleModal = this.rscPythieModal.titleModalAjout;
    }

    this.listTypePlan = new Array<ElementList>();

    //Appel une API pour récupérer les informations du plan + libellés, si id= 0 (mode ajout), récupère que les libellés
    //Récupère la liste de type de plan + information du plan simultanément
    Observable.forkJoin(
      this.pythieService.getPlan(this.idPlan),
      this.listService.getList("typePlan")
    ).subscribe(result => {

      //Traitement du résultat de getPlan
      let dataPlan = result[0];
      //if (dataPlan.hasOwnProperty('success') && dataPlan.success === 'true') {
      //Récupère les libellés dans tous les cas 
      this.labelInput = dataPlan.libelle;

      //Détail d'un plan trouvé donc en modification
      if (dataPlan.hasOwnProperty('detail_plan'))
        this.dataFormInit = dataPlan.detail_plan;
      else
        this.dataFormInit = '';
      /*} else {
        this.exceptionService.handleException(dataPlan).subscribe(() => { }, (err) => {
          this.notificationsService.displayError(err);
        });
      }*/

      //Traitement du résultat getList
      let dataListTypePlan = result[1];
      //if (dataPlan.hasOwnProperty('success') && dataPlan.success === 'true') {
      for (let element of JSON.parse(JSON.stringify(dataListTypePlan)).liste) { this.listTypePlan.push(new ElementList(element)); }

      //Création du formulaire
      this.createForm();
      /*}else {
        this.exceptionService.handleException(dataPlan).subscribe(() => { }, (err) => {
          this.notificationsService.displayError(err);
        });
      }*/

      //Bascule l'affichage
      this.isRequesting = false;

    },
      (error) => this.exceptionService.handleException(error)
      );
  }

  /**
   * Création du formulaire de recherche d'assurés
   */
  createForm(): void {
    this.formPlan = this.formBuilder.group({
      'typePlan': [this.dataFormInit.hasOwnProperty("type_plan") ? this.dataFormInit.type_plan : "", Validators.required],
      'nom': [this.dataFormInit.hasOwnProperty("nom") ? this.dataFormInit.nom : "", Validators.required],
      'description': [this.dataFormInit.hasOwnProperty("description") ? this.dataFormInit.description : ""],
      'dateDebut': [this.dataFormInit.hasOwnProperty("date_debut") ? this.mixinService.parseDateInFR(this.dataFormInit.date_debut) : "", [Validators.required, this.validators.date]],
      'dateFin': [this.dataFormInit.hasOwnProperty("date_fin") ? this.mixinService.parseDateInFR(this.dataFormInit.date_fin) : "", this.validators.date],
      'actif': [this.dataFormInit.hasOwnProperty("actif") ? this.dataFormInit.actif : true]
    });

    //Appelé lors d'un changement de valeurs dans un champs, action faite sur le formulaire
    this.formPlan.valueChanges.subscribe(val => {
      this.formUpdated = true;
    });
  }

  /**
   * Validation du formulaire d'ajout, de modification ou de dupplication d'un plan
   */
  onSubmit() {
    //Notification Ajout effectué (mode = add + duplicate) ou Modification effectuée
    if (this.formPlan.valid) {
      //Converti les dates
      if (this.formPlan.value.dateDebut != "")
        this.formPlan.value.dateDebut = this.mixinService.parseDate8(this.formPlan.value.dateDebut);
      if (this.formPlan.value.dateFin != "")
        this.formPlan.value.dateFin = this.mixinService.parseDate8(this.formPlan.value.dateFin);

      this.pythieService.addUpdateDuplicatePlan(this.idPlan, this.formPlan.value, this.mode)
        .subscribe(result => {
          /*TO DO if (result.hasOwnProperty('success') && result.success === 'true') {
            this.notificationsService.displaySuccessAPI(result.info);*/
            this.onSubmit();
          /*}
          else {
            this.notificationsService.displayErrorAPI(result.info);
          }*/
        });
    }
  }

  /**
   * Ferme la modale avec controle s'il y a eu des données de saisies ou de modifiées
   */
  closeModal() {
    //controle si le formulaire a été modifié/touché et en mode ajout que le formulaire contient des données
    if ((this.mode != 'add' && this.formUpdated == false) || (this.mode == 'add' && !this.controlFormInputFilled()))
      this.dialogRef.close();
    else {
      let message; 
      if (this.mode != 'add') 
        message = this.rsc.message.updateFormConfirm
      else
        message = this.rsc.message.addFormConfirm
      
      //si le formulaire a été modifié/touché, demande de confirmation de fermeture
      let dialogRefConfirm = this.dialog.open(ModalConfirmComponent, {
        data: {
          question: this.rsc.message.quitScreenConfirm,
          additionalMessage: message
        },
        autoFocus: false,
        disableClose: true
      });
      dialogRefConfirm.afterClosed().subscribe(val => {
        //si l'utilsiateur à confirmer la fermeture de la modal
        if (val == true)
          this.dialogRef.close();
      });
    }
  }

  /**
   * Controle s'il y a un des champs du formulaire de renseigné
   */
  controlFormInputFilled() {
    let isValueFilled = false;

    //Pour chaque input possédant un formControl, on vérifie s'il y a une donnée
    for (let valueInput in this.formPlan.controls) {
      if (this.formPlan.get(valueInput).value != "")
        return true;
    }

    return isValueFilled;
  }
}
