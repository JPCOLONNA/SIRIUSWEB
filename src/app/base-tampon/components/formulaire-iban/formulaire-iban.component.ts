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
  selector: 'app-formulaire-iban',
  templateUrl: './formulaire-iban.component.html',
  styleUrls: ['./formulaire-iban.component.scss']
})
export class FormulaireIbanComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;

  @Input() idEvenement: string;

  @Input() idStockage: string;

  /**Le formulaire concerne soit un assuré soit un bénéficaire   */

  /**Données de l'assuré en cours d'affichage/de modification*/
  @Input() iban: any;

   /** Infos assuré */
  @Input() listAssures: Array<any>;

    /**Listes codes/libelles de l ecran de saisie*/
  @Input() parameters: any;

  /** Action effectuée sur l'écran : consulter ou modifier */
  @Input() action: string;

  @Output() onDeleted = new EventEmitter<string>();

  @Output() onSaved = new EventEmitter<string>();

  isModified: boolean=false; 

  // --------------------- Formulaire -----------------------
  /** Nom du formulaire de recherche */
  formIban: FormGroup;
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
      this.formIban = this.formBuilder.group({
        'type_titulaire': [{ value: this.iban.type_titulaire, disabled: true }],
        'id_titulaire': [{ value: this.iban.id_titulaire, disabled: this.disabled }],
        'nom_titulaire': [{ value: this.iban.nom_titulaire, disabled: this.disabled }],
        'prenom_titulaire': [{ value: this.iban.prenom_titulaire, disabled: this.disabled }],
        'nature': [{ value: this.iban.nature, disabled: this.disabled }],
        'statut': [{ value: this.iban.statut, disabled: this.disabled }],
        'debut_validite': [{ value: new Date(this.iban.debut_validite), disabled: this.disabled }],
        'fin_validite': [{ value: new Date(this.iban.fin_validite), disabled: this.disabled }],
        'nom': [{ value: this.iban.nom, disabled: this.disabled }],
        'domiciliation_banque': [{ value: this.iban.domiciliation_banque, disabled: this.disabled }],
        'domiciliation_adresse': [{ value: this.iban.domiciliation_adresse, disabled: this.disabled }],
        'domiciliation_code_postal': [{ value: this.iban.domiciliation_code_postal, disabled: this.disabled }],
        'domiciliation_ville': [{ value: this.iban.domiciliation_ville, disabled: this.disabled }],
        'domiciliation_pays': [{ value: this.iban.domiciliation_pays, disabled: this.disabled }],
        'code_bic': [{ value: this.iban.code_bic, disabled: this.disabled }],
        'iban_code_pays': [{ value: this.iban.iban_code_pays, disabled: this.disabled }],
        'iban_cle': [{ value: this.iban.iban_cle, disabled: this.disabled }],
        'iban_code': [{ value: this.iban.iban_code, disabled: this.disabled }],
        'devise': [{ value: this.iban.devise, disabled: this.disabled }],
        'imputation_frais': [{ value: this.iban.imputation_frais, disabled: this.disabled }],
        'complement_info': [{ value: this.iban.complement_info, disabled: this.disabled }]
      });
      this.formIban.valueChanges.subscribe(val => {
        this.isModified = true;
      });
  }

  onSubmit() {
    this.baseTamponService.saveIbanEvent(this.generateIbanSaveParameters(this.formIban)).subscribe(data => {
        this.isModified=false;
         this.onSaved.emit("");
      });
   
  }

   generateIbanSaveParameters(form: FormGroup) {

      let  JSONArg = JSON.parse('{}');
      JSONArg.idevenement = this.idEvenement;
      JSONArg.idstockage = this.idStockage;
      Object.keys( form.controls).forEach(key => {
        if (this.keepIbanKeys(key)===true) {
          JSONArg[this.convertIbanKeys(key)]=this.convertIbanValues(key, form.controls[key].value);
        }
      });

      return JSONArg;

  }

  
  keepIbanKeys(key:string) {
    let ret: boolean=false;
    if (key!=="nom_titulaire"&&key!=="prenom_titulaire") {
      ret=true;
    }
    return ret;
  }

  convertIbanKeys(key: string) {
    switch (key) {
    case "type_titulaire":
      key="type_titul";
      break;
    case "nature":
      key="nature_rib";
      break;
    case "statut":
      key="statut_rib";
      break;
    case "nom":
      key="beneficiaire";
      break;
    case "domiciliation_banque":
      key="domiciliation";
      break;
    case "domiciliation_adresse":
      key="adr_domi";
      break;
    case "domiciliation_code_postal":
      key="cp_domi";
      break;
    case "domiciliation_ville":
      key="ville_domi";
      break;
    case "domiciliation_pays":
      key="pays_domi";
      break;
    case "iban_code_pays":
      key="pays_iban";
      break;
    case "iban_cle":
      key="cle_iban";
      break;
    case "iban_code":
      key="code_iban";
      break;
    case "devise":
      key="code_devise";
      break;
    case "complement_infos":
      key="complement_info";
      break;
    default:  
  }


    return key;
  }

  convertIbanValues(key: string, value: any) {
    let retour: string=value;
    switch(key) {
      case "debut_validite":
        if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
          let dateTmp: Date=value;
          retour=dateTmp.getFullYear()+("0" + (dateTmp.getMonth()+1)).slice(-2)+("0" + dateTmp.getDate()).slice(-2);
        } else {
          retour="0";
        }
      break;
      case "fin_validite":
          if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
            let dateTmp1: Date=value;
            retour=dateTmp1.getFullYear()+("0" + (dateTmp1.getMonth()+1)).slice(-2)+("0" + dateTmp1.getDate()).slice(-2);
          } else {
            retour="0";
          }
      break;
      case "imputation_frais":
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
      this.onDeleted.emit(this.iban.num);
  }
}
