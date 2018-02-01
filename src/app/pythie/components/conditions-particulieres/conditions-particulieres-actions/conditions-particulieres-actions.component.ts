import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ModalListePiecesComponent } from '../../../../commun/components/modal-liste-pieces/modal-liste-pieces.component';
import { ResourcesService } from '../../../../core/providers/resources.service';

@Component({
  selector: 'app-conditions-particulieres-actions',
  templateUrl: './conditions-particulieres-actions.component.html',
  styleUrls: ['./conditions-particulieres-actions.component.scss']
})
export class ConditionsParticulieresActionsComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc:any;
  
  /** Identifiant assuré */
  @Input() idAssure?: number;
  /** Action sur l'écran<br />Valeur : valeur: consulter(par défaut), modifier, ajouter */
  @Input() action?: string;
  /** Données de la branche CP en cour d'affichage, dans le cas d'une consultation et d'une modification */
  @Input() brancheCP?: any;
  /** Liste des actions et motifs d'actions d'une branche CP */
  listActions: any;
  /** Lite des colonnes à afficher dans le tableau des motifs d'action*/
  displayedColumns: any;            //Liste des colonnes

  /** Pagination du tableau */
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  /** Tries sur les entêtes de colonne */
  @ViewChild(MatSort) sort: MatSort;  

  datasourceGeneral: MatTableDataSource<any>; 

  /**
   * Créer une instance du composant ConditionsParticulieresActionsComponent
   * @param dialog           Pour initier une modale
   * @param activatedRoute   Route active (url du navigateur)
   * @param resourcesService Services de ressources pour toute les applications
   */
  constructor(
    public dialog:MatDialog,
    private activatedRoute: ActivatedRoute,
    private resourcesService:ResourcesService
  ) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources
   * Initialise l'action à l'écran si pas renseigné à "consulter"
   */
  ngOnInit() {
    //Ressources
    this.rsc = this.resourcesService.get();

    //Par défaut, l'accès à l'écran est en mode "consultation"
    if(this.action == null)
      this.action='consulter';
    
    this.listActions = this.brancheCP.liste_actions;

    //Ordre des colonnes
    this.displayedColumns = ['motif', 'anciennete', 'listPiece'];
  }

  /**
   * Créer une dataSource contenant les données passées en paramètre
   * @param listDetailAction Données du tableau
   */
  loadTable(listDetailAction: any)
  {
    let dataSourceTmp = new MatTableDataSource(listDetailAction);
    //Configuration de la pagination
    //dataSource.paginator = this.paginator;
    //Configuration du tri sur les colonnes
    dataSourceTmp.sort = this.sort;

    return dataSourceTmp;
  }

  loadDatasource(index, action)
  {
    this.datasourceGeneral = new MatTableDataSource(action.liste_detail_action);
  }


  /**
   * Affichage de la modale contenant le détail d'une liste de pièces
   * @param idListePieces : Identifiant de la liste de pièces à afficher
   */
  displayModalListPieces(idListePieces: number)
  {
    //Chargement de la modal, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalListePiecesComponent, {
      minWidth:"70%",
      data: { 
        idListePieces: idListePieces, 
        route: this.activatedRoute
      }
    });
  }

}
