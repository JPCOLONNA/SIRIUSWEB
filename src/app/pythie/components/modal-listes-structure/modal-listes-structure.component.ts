import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ListesService } from '../../../core/providers/listes.service';
import { ResourcesService } from '../../../core/providers/resources.service';
import { NotificationsService } from 'app/core/providers/notifications.service';

/**
 * Affiche une liste structure dans une modale
 */
@Component({
  selector: 'app-modal-listes-structure',
  templateUrl: './modal-listes-structure.component.html',
  styleUrls: ['./modal-listes-structure.component.scss']
})
export class ModalListesStructureComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources spécifique à la liste structure */
  rscModal:any;

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;

  /** Identifiant de la liste Structure à afficher.*/
  idListeStructure: number;

  /** Liste structure à afficher */
  listeStructure: any;

  // ------------------ Tableau de types de bénéficiaires ----------------
  /** Entêtes du tableau de types de bénéficiaire */
  labelTable: any;
  /** Liste des types de bénéficiaire */
  listDetailBenefType: Array<any>;
  /** Liste des colonnes du tableau de types de bénéficiaires à afficher */
  displayedColumns: any;
  /** Données du tableau : "listeStructure" au format datasource */
  dataSource: MatTableDataSource<any>;    
  /** Pagination du tableau */          
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Tris sur les entêtes de colonne */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Créer une instance du composant ModalListesStructureComponent
   * @param resourcesService        Services de ressources pour toute les applications
   * @param listesService           Services générique à toute les listes
   * @param notificationsService    Services de notifications de bas de page
   * @param data                    Données reçues en paramètre de l'appel de la modal
   * @param dialogRef               Référence à la modal en cours d'affichage
   */
  constructor(
    private resourcesService: ResourcesService,
    private listesService: ListesService, 
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalListesStructureComponent>) { }

  
  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources<br />
   * Récupère la liste de structure à afficher et construit la datasource pour le tableau
   */
  ngOnInit() {
    //Ressources
    this.rscModal = this.resourcesService.get().modalListeStructure;
    this.rsc = this.resourcesService.get();

    //TO DO : Appel web service pour récupérer le contenu de la liste de pieces
    this.listesService.getListStructure(this.data.idListeStructure).subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.brancheCP = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/
        
        let rscTmp = JSON.parse(JSON.stringify(data))
        this.listeStructure = rscTmp;

        //Liste des types de bénéficiaires
        this.listDetailBenefType = rscTmp.liste_detail;
        //Libellé des colonnes du tableau
        this.labelTable = rscTmp.libelle_detail;
        //Ordre des colonnes
        this.displayedColumns = ['typeBenef', 'maxBenef', 'ageMin', 'ageMax','soumisACotis','maxSoumis','maxExonerer','listPiece'];
        //Données du tableau
        this.dataSource = new MatTableDataSource<any>(this.listDetailBenefType);
        //Configuration de la pagination
        this.dataSource.paginator = this.paginator;
        //Configuration du tri sur les colonnes
        this.dataSource.sort = this.sort;
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
