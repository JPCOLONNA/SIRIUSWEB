import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms/';
import { ResourcesService } from 'app/core/providers/resources.service';
import { DISABLED } from '@angular/forms/src/model';

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

  /**Données de l'assuré en cours d'affichage/de modification*/
  @Input() couverture: any;

      /**Listes codes/libelles de l ecran de saisie*/
  @Input() parameters: any;

  /**Données du bénéficiaire en cours d'affichage/de modification*/
  @Input() couverturebeneficiaire: any;

  /** Action effectuée sur l'écran : consulter ou modifier */
  @Input() action: string;

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
  }

  onSubmit() {}

}
