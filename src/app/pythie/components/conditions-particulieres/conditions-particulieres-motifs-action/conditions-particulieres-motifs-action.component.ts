import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ResourcesService } from 'app/core/providers/resources.service';
import { ModalListePiecesComponent } from 'app/commun/components/modal-liste-pieces/modal-liste-pieces.component';
import { ActivatedRoute } from '@angular/router';
import { ModalListesStructureComponent }  from '../../modal-listes-structure/modal-listes-structure.component';

@Component({
  selector: 'app-conditions-particulieres-motifs-action',
  templateUrl: './conditions-particulieres-motifs-action.component.html',
  styleUrls: ['./conditions-particulieres-motifs-action.component.scss']
})
export class ConditionsParticulieresMotifsActionComponent implements OnInit {

  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc:any;

  /** Données du tableau : "listAssures" au format datasource */
  dataSource: MatTableDataSource<any>;              
  /** Pagination du tableau */
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  /** Tries sur les entêtes de colonne */
  @ViewChild(MatSort) sort: MatSort;  

  @Input() data: any;

  /** Lite des colonnes à afficher dans le tableau des motifs d'action*/
  displayedColumns: any;            //Liste des colonnes
  

  constructor(
    private resourcesService: ResourcesService,
    public dialog:MatDialog,
    private activatedRoute: ActivatedRoute) { 
  }

  /**
   * Initialisation du compsant et de ses variables
   */
  ngOnInit() {
    //transforme les données reçues en DataSource pour l'affichage du tableau
    this.dataSource = new MatTableDataSource<any>(this.data);

    //Ordre des colonnes
    this.displayedColumns = ['motif', 'anciennete', 'commentaires', 'impact_action', 'listPiece'];

    //Ressources
    this.rsc = this.resourcesService.get();

  }

  /**
   * Fini l'initialisation du composant <br />
   * Appeler à la fin du chargement du composant
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  /**
   * Affichage de la modale contenant le détail d'une liste de pièces
   * @param idListePieces : Identifiant de la liste de pièces à afficher
   */
  openModalListePieces(idListePieces: number)
  {
    //Chargement de la modal, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalListePiecesComponent, {
      minWidth:"70%",
      data: { 
        idListePieces: idListePieces, 
        route: this.activatedRoute
      },
      autoFocus: false 
    });
  }

  /**
   * Affichage de la modale contenant le détail d'une liste structure
   * @param idListeStructure Identifiant de la liste structure à afficher
   */
  openModalListeStructure(idListeStructure: number)
  {
    //Chargement de la modal, la taille varie selon le contenu.
    //En paramètre : identifiant de la liste structure à afficher et l'url du navigateur
    let dialogRef = this.dialog.open(ModalListesStructureComponent, {
      minWidth:"80%",
      data: { 
        idListeStructure: idListeStructure, 
        route: this.activatedRoute,
      },
      autoFocus: false 
    });
  }
}
