import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesBaseTamponService } from 'app/base-tampon/providers/resources-base-tampon.service';
import { BaseTamponService } from 'app/base-tampon/providers/base-tampon.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ResourcesService } from 'app/core/providers/resources.service';
import {Evenement} from '../../model/evenement';
import { NotificationsService } from 'app/core/providers/notifications.service';

/**
 * Liste les actions/évènements en attente de validation par le métier
 */
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources "BASE TAMPON" : label de l'application "Base tampon" <br />Fichier : _base-tampon-resources.json */
  rscBaseTampon: any;

  /** Identifiant de l'évènement : initié lors qu clic sur une ligne*/
  idStockage: number;
  idEvt: number;

  // ----------------- Tableau d'évènements ---------------------
  /** Liste des évènements, actions en attentes de validation*/
  eventList: Array<Evenement>;
  /** Liste des colonnes du tableau des assurés à afficher */
  displayedColumns: any;
  /** Données du tableau : "listAssures" au format datasource */
  dataSourceBaseTampon: MatTableDataSource<any>;
  /** Pagination du tableau */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Tris sur les entêtes de colonne */
  @ViewChild(MatSort) sort: MatSort;

  /**
   *  Créer une instance du composant EventsListComponent
   * @param resourcesBaseTamponService      Services de ressources pour l'application "BASE TAMPON" 
   * @param resourcesService                Services de ressources pour toute les applications
   * @param baseTamponService               Services de l'application "BASE TAMPON"
   * @param notificationsService
   * @param router
   */
  constructor(
    private resourcesBaseTamponService: ResourcesBaseTamponService,
    private resourcesService: ResourcesService,
    private baseTamponService: BaseTamponService,
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources<br />
   * Récupère et construit la liste des actions/évènements à valider
   */
  ngOnInit() {
    //Ressources
    this.rsc = this.resourcesService.get();
    this.rscBaseTampon = this.resourcesBaseTamponService.get();





    
    //Liste des actions à valider
    //this.baseTamponService.getListeEvenements().subscribe(
      this.baseTamponService.loadEventsList("").subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.brancheCP = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/

        //Cast le résultat de type "object" en structure JSON
        let rscTmp = JSON.parse(JSON.stringify(data))
        
        //Liste des évènements 
        this.eventList = new Array<Evenement>();
        for(let evt of rscTmp.ListeEvt){
            this.eventList.push(new Evenement(evt));
        }

        //this.eventList = rscTmp.liste_evenements;

        //Ordre des colonnes
        this.displayedColumns = ['provenance', 'type_action', 'id_assure', 'nom_assure', 'id_societe', 'raison_sociale', 'date_traitement'];
        //Données du tableau
        this.dataSourceBaseTampon = new MatTableDataSource<any>(this.eventList);
        //Configuration de la pagination
        this.dataSourceBaseTampon.paginator = this.paginator;
        //Configuration du tri sur les colonnes
        this.dataSourceBaseTampon.sort = this.sort;
      },
      (error) => {
        this.notificationsService.displayError(error);
      }
    );
  }

  /**
   * Applique le filtre sur la liste des actions/évènements 
   * @param filterValue Valeur du filtre, valeur recherchée
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceBaseTampon.filter = filterValue;
  }

  /**
   * Lors de la sélection d'une action/évènement, sauvegarde l'id stockage passé au composant via router-outlet
   */
  selectEvent(idStockage: any, idEvt: any) {
    this.idStockage = idStockage;
    this.idEvt = idEvt;
    this.router.navigate(['/tampon/fiche']);
  }


}
