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
  selector: 'app-formulaire-assure',
  templateUrl: './formulaire-assure.component.html',
  styleUrls: ['./formulaire-assure.component.scss']
})
export class FormulaireAssureComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;

  /**Le formulaire concerne soit un assuré soit un bénéficaire   */

  /**Données de l'assuré en cours d'affichage/de modification*/
  @Input() assure: any;

    /**Listes codes/libelles de l ecran de saisie*/
  @Input() parameters: any;

  /**Données du bénéficiaire en cours d'affichage/de modification*/
  @Input() beneficiaire: any;

  @Input() idEvenement: string;

  @Input() idStockage: string;

  /** Action effectuée sur l'écran : consulter ou modifier */
  @Input() action: string;

  @Output() onDeleted = new EventEmitter<string>();

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
    if (this.assure !== undefined) {
      this.formAssure = this.formBuilder.group({
        'civilite': [{ value: this.assure.civilite, disabled: this.disabled }],
        'nom': [{ value: this.assure.nom, disabled: this.disabled }],
        'prenom': [{ value: this.assure.prenom, disabled: this.disabled }],
        'adresse': [{ value: this.assure.adresse, disabled: this.disabled }],
        'adresse_suite': [{ value: this.assure.adresse_suite, disabled: this.disabled }],
        'code_postal': [{ value: this.assure.code_postal, disabled: this.disabled }],
        'ville': [{ value: this.assure.ville, disabled: this.disabled }],
        'telephone': [{ value: this.assure.telephone_fixe, disabled: this.disabled }],
        'fax': [{ value: this.assure.telephone_mobile, disabled: this.disabled }],
        'email': [{ value: this.assure.email, disabled: this.disabled }],
        'code_banque': [{ value: this.assure.code_banque, disabled: this.disabled }],
        'guichet_banque': [{ value: this.assure.guichet_banque, disabled: this.disabled }],
        'num_compte': [{ value: this.assure.num_compte, disabled: this.disabled }],
        'cle_compte': [{ value: this.assure.cle_compte, disabled: this.disabled }],
        'date_naissance': [{ value: new Date(this.assure.date_naissance), disabled: this.disabled }],
        'situation_familiale': [{ value: this.assure.situation_familiale, disabled: this.disabled }],
        'nombre_enfant': [{ value: this.assure.nombre_enfant, disabled: this.disabled }],
        'transfert_noemie': [{ value: this.assure.transfert_noemie, disabled: this.disabled }],
        'regime': [{ value: this.assure.regime_caisse, disabled: this.disabled }],
        'caisse': [{ value: this.assure.caisse, disabled: this.disabled }],
        'guichet': [{ value: this.assure.guichet_caisse, disabled: this.disabled }],
        'cle': [{ value: this.assure.cle_caisse, disabled: this.disabled }],
        'num_ss': [{ value: this.assure.numero_ss, disabled: this.disabled }],
        'cle_ss': [{ value: this.assure.cle_ss, disabled: this.disabled }]
      });
    } else {
            this.formAssure = this.formBuilder.group({
        'civilite': [{ value: this.beneficiaire.civilite, disabled: this.disabled }],
        'nom': [{ value: this.beneficiaire.nom, disabled: this.disabled }],
        'prenom': [{ value: this.beneficiaire.prenom, disabled: this.disabled }],
        'adresse': [{ value: this.beneficiaire.adresse, disabled: this.disabled }],
        'adresse_suite': [{ value: this.beneficiaire.adresse_suite, disabled: this.disabled }],
        'code_postal': [{ value: this.beneficiaire.code_postal, disabled: this.disabled }],
        'ville': [{ value: this.beneficiaire.ville, disabled: this.disabled }],
        'telephone': [{ value: this.beneficiaire.telephone_fixe, disabled: this.disabled }],
        'fax': [{ value: this.beneficiaire.telephone_mobile, disabled: this.disabled }],
        'email': [{ value: this.beneficiaire.email, disabled: this.disabled }],
        'code_banque': [{ value: this.beneficiaire.code_banque, disabled: this.disabled }],
        'guichet_banque': [{ value: this.beneficiaire.guichet_banque, disabled: this.disabled }],
        'num_compte': [{ value: this.beneficiaire.num_compte, disabled: this.disabled }],
        'cle_compte': [{ value: this.beneficiaire.cle_compte, disabled: this.disabled }],
        'date_naissance': [{ value: new Date(this.beneficiaire.date_naissance), disabled: this.disabled }],
        'situation_familiale': [{ value: this.beneficiaire.situation_familiale, disabled: this.disabled }],
        'nombre_enfant': [{ value: this.beneficiaire.nombre_enfant, disabled: this.disabled }],
        'transfert_noemie': [{ value: this.beneficiaire.transfert_noemie, disabled: this.disabled }],
        'regime': [{ value: this.beneficiaire.regime_caisse, disabled: this.disabled }],
        'caisse': [{ value: this.beneficiaire.caisse, disabled: this.disabled }],
        'guichet': [{ value: this.beneficiaire.guichet_caisse, disabled: this.disabled }],
        'cle': [{ value: this.beneficiaire.cle_caisse, disabled: this.disabled }],
        'num_ss': [{ value: this.beneficiaire.numero_ss, disabled: this.disabled }],
        'cle_ss': [{ value: this.beneficiaire.cle_ss, disabled: this.disabled }],
        'qualite': [{ value: this.beneficiaire.qualite, disabled: this.disabled }],
        'rang': [{ value: this.beneficiaire.rang, disabled: this.disabled }],
        'attachement': [{ value: this.beneficiaire.attachement, disabled: this.disabled }],
        'debut_effet': [{ value: new Date(this.beneficiaire.debut_effet), disabled: this.disabled }],
        'fin_effet': [{ value: new Date(this.beneficiaire.fin_effet), disabled: this.disabled }]
      });
    }
  }

  onSubmit($event) {
    this.baseTamponService.saveEvent(this.generateAssureSaveParameters(this.formAssure)).subscribe(data => {

    });

    ;
  }

  delete()  {
    if (this.assure !== undefined) {
      this.onDeleted.emit(this.assure.num);
    } else {
      this.onDeleted.emit(this.beneficiaire.num);
    }
  }

  generateAssureSaveParameters(form: FormGroup) {

    if (this.assure !== undefined) {
      let  JSONArg = JSON.parse('{"assure":[{}]}');
      JSONArg["idevenement"] = this.idEvenement;
      JSONArg["idstockage"] = this.idStockage;
      JSONArg.assure[0].id_assure=this.assure.id_assure;
      Object.keys( form.controls).forEach(key => {
        if (this.keepKeyAssure(key)===true) {
          JSONArg.assure[0][this.convertAssureKeys(key)]=form.controls[key].value;
        }
      });

      return JSONArg;
    } else {

    }
  }

  keepKeyAssure(key:string) {
    let ret: boolean=false;
    if (key!=="qualite"&&key!=="rang"&&key!=="attachement"&&key!=="debut_effet"&&key!=="fin_effet") {
      ret=true;
    }
    return ret;
  }

  convertAssureKeys(key: string) {
    switch (key) {
    case "nom":
      key="nom_assure";
      break;
    case "prenom":
      key="prenom_assure";
      break;
    case "telephone":
      key="telephone_fixe";
      break;
    case "fax":
      key="telephone_mobile";
      break;
    case "regime":
      key="regime_caisse";
      break;
    case "guichet":
      key="guichet_caisse";
      break;
    case "cle":
      key="cle_caisse";
      break;
    case "num_ss":
      key="numero_ss";
      break;
    default:
      
  }


    return key;
  }

}
