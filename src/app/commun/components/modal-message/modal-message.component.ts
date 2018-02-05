import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResourcesService } from '../../../core/providers/resources.service';

/**
 * Modale contenant les messages complets défilants et à communiquer aux gestionnaires
 */
@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {

  /** Ressources spécifique à cet écran <br /> Fichier : resources/_resources.json */
  rscMessage: any;

  /** Messages à afficher */
  messages: string;

  /**
   * Créer une instance du composant ModalMessageComponent
   * @param resourcesService    Services de ressources pour toute les applications
   * @param dialogRef           Référence à la modale en cours d'affichage
   * @param data                Données reçues en paramètre de l'appel de la modal
   */
  constructor(
    private resourcesService : ResourcesService,
    public dialogRef: MatDialogRef<ModalMessageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Initialise le composant et de ses variables<br/>
   */
  ngOnInit() {
    //TO DO : Récupération des messages pour le gestionnaire connecté
    //gestionnaire = this.mixinService.getFromLocalStorage("currentUser");
    this.messages = "Les messages défilants à communiquer au gestionnaire connecté.";
    this.rscMessage = this.resourcesService.get().modalMessages;
  }

  /**
   * Ferme la modale
   */
  closeModal()
  {
    this.dialogRef.close();
  }

}
