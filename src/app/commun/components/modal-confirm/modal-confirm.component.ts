import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResourcesService } from 'app/core/providers/resources.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;

  /** Question à afficher */
  question : string;

  /** Message en complément de la question à afficher */
  additionalMessage: string;

  /**
   * Crée une instance de ModalConfirmComponent
   * @param data        Données passée à la modale lors de l'apper
   * @param dialogRef   Référence à la modale ouverte 
   */
  constructor(
    private resourcesService: ResourcesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalConfirmComponent>) { }

  /**
   * Initialise le composant et ses variables
   */
  ngOnInit() {
    this.rsc = this.resourcesService.get();
    this.question = this.data.question;
    this.additionalMessage = this.data.additionalMessage;
  }

  /**
   * Ferme la modale et renvoi la valeur du bouton à l'écran/modale appelant/parent
   */
  closeModal(valueButton: string) {
    this.dialogRef.close(valueButton);
  }

}
