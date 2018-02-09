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
  selector: 'app-formulaire-couverture',
  templateUrl: './formulaire-couverture.component.html',
  styleUrls: ['./formulaire-couverture.component.scss']
})
export class FormulaireCouvertureComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;

  /**Le formulaire concerne soit un assuré soit un bénéficaire   */


  @Input() idEvenement: string;

  @Input() idStockage: string;

  /**Données de l'assuré en cours d'affichage/de modification*/
  @Input() couverture: any;

      /**Listes codes/libelles de l ecran de saisie*/
  @Input() parameters: any;

  /**Données du bénéficiaire en cours d'affichage/de modification*/
  @Input() couverturebeneficiaire: any;

  /** Action effectuée sur l'écran : consulter ou modifier */
  @Input() action: string;

  @Output() onDeleted = new EventEmitter<string>();

  @Output() onSaved = new EventEmitter<string>();

  isModified: boolean=false; 

  // --------------------- Formulaire -----------------------
  /** Nom du formulaire de recherche */
  formCouverture: FormGroup;
  /** Validateurs du formulaire pre-définis */
  validators: any;
  /** Masques de saisie pre-définis */
  mask: any;

  /** Statut des champs, désactivée si l'utilisateur n'a pas le droit de modifier  */
  disabled = true;


  /**
   * Crée une instance du composant FormulaireCouvertureComponent
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
    if (this.couverture !== undefined) {
      this.formCouverture = this.formBuilder.group({
        'statut': [{ value: this.couverture.statut, disabled: this.disabled }],
        'famille': [{ value: this.couverture.famille_produit, disabled: this.disabled }],
        'produit': [{ value: this.couverture.produit, disabled: this.disabled }],
        'risque': [{ value: this.couverture.risque, disabled: this.disabled }],
        'option': [{ value: this.couverture.code_option, disabled: this.disabled }],
        'debut_effet': [{ value: new Date(this.couverture.debut_effet), disabled: this.disabled }],
        'fin_effet': [{ value: new Date(this.couverture.fin_effet), disabled: this.disabled }],
        'date_annulation': [{ value: new Date(this.couverture.date_annulation), disabled: this.disabled }],
        'ref_client': [{ value: this.couverture.reference_client, disabled: this.disabled }]
      });
    } else {
            this.formCouverture = this.formBuilder.group({
        'nom': [{ value: this.couverturebeneficiaire.nom_assure, disabled: this.disabled }],
        'prenom': [{ value: this.couverturebeneficiaire.prenom_assure, disabled: this.disabled }],
        'statut': [{ value: this.couverturebeneficiaire.statut, disabled: this.disabled }],
        'famille': [{ value: this.couverturebeneficiaire.famille_produit, disabled: this.disabled }],
        'produit': [{ value: this.couverturebeneficiaire.produit, disabled: this.disabled }],
        'risque': [{ value: this.couverturebeneficiaire.risque, disabled: this.disabled }],
        'option': [{ value: this.couverturebeneficiaire.code_option, disabled: this.disabled }],
        'debut_effet': [{ value: new Date(this.couverturebeneficiaire.debut_effet), disabled: this.disabled }],
        'fin_effet': [{ value: new Date(this.couverturebeneficiaire.fin_effet), disabled: this.disabled }],
        'date_annulation': [{ value: new Date(this.couverturebeneficiaire.date_annulation), disabled: this.disabled }],
        'ref_client': [{ value: this.couverturebeneficiaire.reference_client, disabled: this.disabled }]
      });
    }
    this.formCouverture.valueChanges.subscribe(val => {
      this.isModified = true;
    });
  }

  onSubmit() {
    if (this.couverture !== undefined) {
      this.baseTamponService.saveCouvertureEvent(this.generateAssureSaveParameters(this.formCouverture),0).subscribe(data => {
        this.isModified=false;
      });
    } else {
      this.baseTamponService.saveCouvertureEvent(this.generateAssureSaveParameters(this.formCouverture),1).subscribe(data => {
        this.isModified=false;
      });
    }
    this.onSaved.emit("");
  }

  generateAssureSaveParameters(form: FormGroup) {

    if (this.couverture !== undefined) {
      let  JSONArg = JSON.parse('{}');
      JSONArg.idevenement = this.idEvenement;
      JSONArg.idstockage = this.idStockage;
      JSONArg.id_assure=this.couverture.id_assure;
      Object.keys( form.controls).forEach(key => {
        if (this.keepKeyAssure(key)===true) {
          JSONArg[this.convertAssureKeys(key)]=this.convertAssureValues(key, form.controls[key].value);
        }
      });

      return JSONArg;
    } else {
      let  JSONArg = JSON.parse('{}');
      JSONArg.idevenement = this.idEvenement;
      JSONArg.idstockage = this.idStockage;
      JSONArg.id_assure=this.couverturebeneficiaire.id_assure;
      JSONArg.id_benef=this.couverturebeneficiaire.id_benef;
      Object.keys( form.controls).forEach(key => {
        if (this.keepKeyAssure(key)===true) {
          JSONArg[this.convertAssureKeys(key)]=this.convertAssureValues(key, form.controls[key].value);
        }
        });

      return JSONArg;
    }
  }

  
  keepKeyAssure(key:string) {
    let ret: boolean=false;
    if (key!=="statut"&&key!=="famille"&&key!=="produit"&&key!=="nom"&&key!=="prenom") {
      ret=true;
    }
    return ret;
  }

  convertAssureKeys(key: string) {
    switch (key) {
    case "risque":
      key="code_risque";
      break;
    case "option":
      key="code_option";
      break;
    case "ref_client":
      key="reference_client";
      break;
    case "nom":
      key="nom_benef";
      break;
    case "prenom":
      key="prenom_benef";
      break;
    default:  
  }


    return key;
  }

  convertAssureValues(key: string, value: any) {
    let retour: string=value;
    switch(key) {
      case "date_annulation":
        if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
          let dateTmp: Date=value;
          retour=dateTmp.getFullYear()+("0" + (dateTmp.getMonth()+1)).slice(-2)+("0" + dateTmp.getDate()).slice(-2);
        } else {
          retour="0";
        }
      break;
      case "debut_effet":
          if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
            let dateTmp1: Date=value;
            retour=dateTmp1.getFullYear()+("0" + (dateTmp1.getMonth()+1)).slice(-2)+("0" + dateTmp1.getDate()).slice(-2);
          } else {
            retour="0";
          }
      break;
      case "fin_effet":
          if (value!==undefined && value!=null && value!="" && (value+"")!=="Invalid Date") {
            let dateTmp2: Date=value;
            retour=dateTmp2.getFullYear()+("0" + (dateTmp2.getMonth()+1)).slice(-2)+("0" + dateTmp2.getDate()).slice(-2);
          } else {
            retour="0";
          }
      break;
      case "transfert_noemie":
        let transf: boolean=value;
        if (transf===true) {
          retour='1';
        } else {
          retour='0';
        }
      default:
    }

    return retour;
  }

   delete()  {
     if (this.couverture !== undefined) {
        this.onDeleted.emit(this.couverture.num);
     } else {
        this.onDeleted.emit(this.couverturebeneficiaire.num);
     }
  }

}
