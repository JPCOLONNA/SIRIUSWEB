import { Component, OnInit, Inject } from '@angular/core';
import { ResourcesService } from '../../../core/providers/resources.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ListService } from '../../../core/providers/list.service';
import { ModalPlusDinfoComponent } from '../modal-plus-dinfo/modal-plus-dinfo.component';
import { NotificationsService } from 'app/core/providers/notifications.service';

/**
 * Affiche une liste de pièces dans une modale
 */
@Component({
  selector: 'app-modal-liste-pieces',
  templateUrl: './modal-liste-pieces.component.html',
  styleUrls: ['./modal-liste-pieces.component.scss']
})
export class ModalListePiecesComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources spécifique à la liste des pièces */
  rscListePieces: any;

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;
  
  /** Liste des pièces à afficher */ 
  listePieces: any;

  /**
   * Créer une instance du composant ModalListePiecesComponent
   * @param resourcesService      Services de ressources pour toute les applications
   * @param listService           Services générique à toute les listes
   * @param notificationsService  Services de notifications de bas de page
   * @param data                  Données reçues en paramètre de l'appel de la modal
   * @param dialogRef             Référence à la modale en cours d'affichage
   */
  constructor(
    private resourcesService: ResourcesService,
    private listService: ListService,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalListePiecesComponent>
  ) { 
    
  }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources<br />
   * Récupère la liste des pièces à afficher
   */
  ngOnInit() {
    this.rsc = this.resourcesService.get();
    this.rscListePieces = this.rsc.modalListePieces

    //TO DO : Appel web service pour récupérer le contenu de la liste de pieces
    this.listService.getListPieces(this.data.idListePieces).subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.brancheCP = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/
        this.listePieces = data;
        this.doneRequesting();
      },
      (error) => {
        this.notificationsService.displayError(error);
      }
    );

  }

  /**
   * Change l'état de la page "en chargement" <==> "affichée"
   */
  doneRequesting() {
    if (this.isRequesting) {
      this.isRequesting = false;
    }
  }

  /**
   * Ferme la modale
   */
  closeModal()
  {
    this.dialogRef.close();
  }

}
