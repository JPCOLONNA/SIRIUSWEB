import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * Affihce dans une modal un texte passé en paramètre<br />
 * Utilisé pour afficher le texte complet d'une chaine tronquée
 */
@Component({
  selector: 'app-modal-plus-dinfo',
  templateUrl: './modal-plus-dinfo.component.html',
  styleUrls: ['./modal-plus-dinfo.component.scss']
})
export class ModalPlusDinfoComponent implements OnInit {

  /**
   * Crée une instance du composant ModalPlusDinfoComponent
   * @param dialogRef       Référence à la modal en cours d'affichage
   * @param data            Données reçues en paramètre de l'appel de la modal : contient le texte à afficher
   */
  constructor(
    public dialogRef: MatDialogRef<ModalPlusDinfoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * N'effectue aucune action
   */
  ngOnInit() {
  }

  /**
   * Ferme la modale
   */
  closeModal()
  {
    this.dialogRef.close();
  }

}
