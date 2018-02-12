import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms/';
import { ResourcesService } from 'app/core/providers/resources.service';
import { DISABLED } from '@angular/forms/src/model';
import { BaseTamponService } from 'app/base-tampon/providers/base-tampon.service';

/**
 * Formulaire de modification d'un assuré en base tampon.<br />
 * Selon les droits les données ne sont pas modifiable
 */
@Component({
  selector: 'app-formulaire-infos-salariales',
  templateUrl: './formulaire-infos-salariales.component.html',
  styleUrls: ['./formulaire-infos-salariales.component.scss']
})
export class FormulaireInfosSalarialesComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;

  /**Le formulaire concerne soit un assuré soit un bénéficaire   */

  @Input() idEvenement: string;

  @Input() idStockage: string;

  /**Données de l'assuré en cours d'affichage/de modification*/
  @Input() assure: any;

      /**Listes codes/libelles de l ecran de saisie*/
  @Input() parameters: any;

  /** Action effectuée sur l'écran : consulter ou modifier */
  @Input() action: string;

  @Output() onDeleted = new EventEmitter<string>();

  @Output() onSaved = new EventEmitter<string>();

  isModified: boolean=false; 

  // --------------------- Formulaire -----------------------
  /** Nom du formulaire de recherche */
  formAssure: FormGroup;
  /** Validateurs du formulaire pre-définis */
  validators: any;
  /** Masques de saisie pre-définis */
  mask: any;

  /** Statut des champs, désactivée si l'utilisateur n'a pas le droit de modifier  */
  disabled = true;


  /**
   * Crée une instance du composant FormulaireAssureComponent
   * @param resourcesService      Services de ressources pour toute les applications 
   * @param formBuilder 
   */
  constructor(
    private resourcesService: ResourcesService,
    private baseTamponService: BaseTamponService,
    private formBuilder: FormBuilder) { }

  /**
   * Initialise le composant et ses variables<br />
   * Construit le formulaire
   */
  ngOnInit() {

    // Attribut la valeur par défaut
    if (this.action == "")
      this.action = "consulter";

    if (this.action == "modifier")
      this.disabled = false;

    //Ressources générales
    this.rsc = this.resourcesService.get();

    //Création du formulaire
    this.createForm();
  }

  /**
   * Création du formulaire d'un assuré dans la base tampon
   */
  createForm(): void {
      this.formAssure = this.formBuilder.group({
        'code_societe': [{ value: this.assure.code_societe, disabled: this.disabled }],
        'raison_sociale': [{ value: this.assure.raison_sociale, disabled: this.disabled }],
        'prenom': [{ value: this.assure.prenom, disabled: this.disabled }],
        'nom': [{ value: this.assure.nom, disabled: this.disabled }],
        'code_salarie': [{ value: this.assure.code_salarie, disabled: this.disabled }],
        'debut_contrat': [{ value: new Date(this.assure.debut_contrat), disabled: this.disabled }],
        'fin_contrat': [{ value: new Date(this.assure.fin_contrat), disabled: this.disabled }],
        'motif_depart': [{ value: this.assure.motif_depart, disabled: this.disabled }],
        'top_refus': [{ value: this.assure.top_refus, disabled: this.disabled }],
        'statut_professionnel': [{ value: this.assure.statut_professionnel, disabled: this.disabled }],
        'niveau_professionnel': [{ value: this.assure.niveau_professionnel, disabled: this.disabled }],
        'echelon': [{ value: this.assure.echelon, disabled: this.disabled }],
        'categorie_socio_professionnelle': [{ value: this.assure.categorie_socio_professionnelle, disabled: this.disabled }],
        'contrat_travail': [{ value: this.assure.contrat_travail, disabled: this.disabled }],
        'temps_de_travail': [{ value: this.assure.temps_de_travail, disabled: this.disabled }]
      });
      this.formAssure.valueChanges.subscribe(val => {
        this.isModified = true;
      });
  }

  onSubmit() {
    this.baseTamponService.saveInfosSalEvent(this.generateInfosSalSaveParameters(this.formAssure)).subscribe(data => {
        this.isModified=false;
        this.onSaved.emit("");
      });
  }

  generateInfosSalSaveParameters(form: FormGroup) {

      let  JSONArg = JSON.parse('{}');
      JSONArg.idevenement = this.idEvenement;
      JSONArg.idstockage = this.idStockage;
      Object.keys( form.controls).forEach(key => {
        if (this.keepInfosSalKeys(key)===true) {
          JSONArg[this.convertInfosSalKeys(key)]=this.convertInfosSalValues(key, form.controls[key].value);
        }
      });

      return JSONArg;

  }

  
  keepInfosSalKeys(key:string) {
    let ret: boolean=false;
    if (key!=="code_societe"&&key!=="raison_sociale"&&key!=="prenom"&&key!=="nom"&&key!=="niveau_professionnel"&&key!=="echelon"&&key!=="categorie_socio_professionnelle"&&key!=="temps_travail") {
      ret=true;
    }
    return ret;
  }

  convertInfosSalKeys(key: string) {
    switch (key) {
    case "code_salarie":
      key="id_salarie";
      break;
    case "top_refus":
      key="refus_portabilite";
      break;
    case "statut_professionnel":
      key="statut_prof";
      break;
    case "contrat_travail":
      key="contrat_travail";
      break;
    default:  
  }


    return key;
  }

  convertInfosSalValues(key: string, value: any) {
    let retour: string=value;
    switch(key) {
      case "debut_contrat":
        if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
          let dateTmp: Date=value;
          retour=dateTmp.getFullYear()+("0" + (dateTmp.getMonth()+1)).slice(-2)+("0" + dateTmp.getDate()).slice(-2);
        } else {
          retour="0";
        }
      break;
      case "fin_contrat":
          if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
            let dateTmp1: Date=value;
            retour=dateTmp1.getFullYear()+("0" + (dateTmp1.getMonth()+1)).slice(-2)+("0" + dateTmp1.getDate()).slice(-2);
          } else {
            retour="0";
          }
      break;
      case "top_refus":
        let transf: boolean=value;
        if (transf===true) {
          retour='1';
        } else {
          retour='0';
        }
      break;
      default:
    }

    return retour;
  }

   delete()  {
      this.onDeleted.emit(this.assure.num);
  }
}
