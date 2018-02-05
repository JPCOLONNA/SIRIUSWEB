import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ResourcesService } from '../../../core/providers/resources.service';
import { MixinService } from '../../../core/providers/mixin.service';

import { ResourcesAssuresService } from '../../providers/resources-assures.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstructionMenuService } from '../../../core/providers/construction-menu.service';
import { MenuEvent } from '../../../core/broadcast/menu-event';
import { AssuresService } from '../../providers/assures.service';

import { ExceptionService } from '../../../core/providers/exception.service';
import { NotificationsService } from '../../../core/providers/notifications.service';

/** 
 * Recherche d'un assuré, résulats sous forme de liste</br />
 */
@Component({
  selector: 'app-search-assure',
  templateUrl: './search-assure.component.html',
  styleUrls: ['./search-assure.component.scss']
})
export class SearchAssureComponent implements OnInit {
  
  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = false;
  
  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;                         
  /** Ressources "ASSURES" : label de l'application "ASSURE"<br /> Fichier : resources/_assures-resources.json */
  rscAssures: any;                  //Ressources de l'application "Assurés"
  /** Ressources spécifique au moteur de recherche : filtre de rscAssures */
  rscAssuresSearch: any;            //Ressources de l'application "Assurés" pour l'écran de recherche

  // --------------------- Formulaire -----------------------
  /** Nom du formulaire de recherche */
  formSearchAssure : FormGroup;   
  /** Validateurs du formulaire pre-définis */
  validators: any;                  
  /** Masques de saisie pre-définis */
  mask: any;

  // ----------------- Tableau d'assurés ---------------------
  /** Entêtes du tableau des assurés */
  labelTable: any;                  
  /** Liste des assurés trouvés, à afficher */
  listAssures: Array<any>;
  /** Liste des colonnes du tableau des assurés à afficher */
  displayedColumns: any;
  /** Données du tableau : "listAssures" au format datasource */
  dataSource: MatTableDataSource<any>;              
  /** Pagination du tableau */
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  /** Tris sur les entêtes de colonne */
  @ViewChild(MatSort) sort: MatSort;  
  
  /** Identifiant de l'assuré sélectionné, récupéré dans le composant parent au changement de la page **/
  idAssure: number;

  /**
   * Créer une instance du composant SearchAssureComponent<br />
   * @param resourcesAssuresService     Services de ressources pour l'application "ASSURES" 
   * @param resourcesService            Services de ressources pour toute les applications
   * @param mixinService                Services généraux
   * @param notificationsService        Services de notifications de bas de page
   * @param menuEvent                   Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   * @param constructionMenuService     Construit le menu selon les droits et la présence d'un identifiant ou non
   * @param assuresService              Services de l'application "ASSURES"
   * @param exceptionService            Services de gestion des exceptions
   * @param formBuilder 
   * @param http 
   * @param router 
   * @param route 
   */
  constructor(
    private resourcesAssuresService: ResourcesAssuresService,
    private resourcesService: ResourcesService,
    private mixinService: MixinService,
    private notificationsService: NotificationsService,
    private menuEvent: MenuEvent,
    private constructionMenuService: ConstructionMenuService,
    private assuresService: AssuresService,
    private exceptionService : ExceptionService,
    private formBuilder : FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources<br />
   * Construit le menu
   */
  ngOnInit() {
    //Ressources
    this.rsc = this.resourcesService.get();   
    this.rscAssures = this.resourcesAssuresService.get();
    this.rscAssuresSearch = this.rscAssures.searchAssure;
    this.validators = this.mixinService.getValidators();
    this.mask = this.mixinService.getMasks();

    //Réinitialise l'identifiant assuré et le menu 
    this.idAssure = 0;
    //Chargement du menu en précisnt qu'il n'y a pas d'identifiant assuré de connu pour désactiver les liens nécessitants un identifiant
    this.menuEvent.fire(JSON.stringify(this.constructionMenuService.constructionMenuNavigation(this.rscAssures.menu, false)));

    //Création du formulaire
    this.createForm();
  }

  /**
   * Création du formulaire de recherche d'assurés
   */
  createForm(): void
  {
    this.formSearchAssure = this.formBuilder.group({
      'numAssure' : ['',this.validators.number],
      'numSS' : ['', this.validators.numSS],
      'dateNaissance' : ['',this.validators.date],
      'nom' : ['', this.validators.name],
      'prenom' : ['', this.validators.name],
      'codePostal' : ['', this.validators.codePostal]
    });
  }

  /**
   * Soumission du formulaire de recherche d'un assuré
   */
  onSubmit()
  {  
    if(this.formSearchAssure.valid)
    {
      this.doneRequesting(true);

      //Convertie le format de la date
      if(this.formSearchAssure.value.dateNaissance != "")
        this.formSearchAssure.value.dateNaissance = this.mixinService.parseDate8(this.formSearchAssure.value.dateNaissance);

      this.assuresService.getListAssures(this.formSearchAssure.value)
        .subscribe(
          (data) => {             
            if (data.hasOwnProperty('success') && data.success === 'true') {
              //Cast le résultat de type "object" en structure JSON
              let rscTmp = data;
              //Liste des assurés
              this.listAssures = rscTmp.liste_assures;
              //Libellé des colonnes du tableau
              this.labelTable = rscTmp.libelle;
              //Ordre des colonnes
              this.displayedColumns = ['numAssure', 'nom', 'prenom', 'numSS','dateNaissance','codePostal','ville'];
              //Données du tableau
              this.dataSource = new MatTableDataSource<any>(this.listAssures);
              //Configuration de la pagination
              this.dataSource.paginator = this.paginator;
              //Configuration du tri sur les colonnes
              this.dataSource.sort = this.sort;
            } else {
              this.exceptionService.handleException(data).subscribe(() => {}, (error) => {
                //this.exceptionService.error.next({type:0, msg:error});
                this.notificationsService.displayError(error);
              });
            }
            this.doneRequesting(false);
          },
          (error) => {
            this.notificationsService.displayError(error);
          }
        );
    }
    else
    {
      this.notificationsService.displayError("Champs du formulaire de recherche mal renseignés");
    }
  }

  /**
   * Lors de la sélection d'un assuré, sauvegarde l'id assuré sélectionné via router-outlet
   */
  selectAssure(idAssure: any)
  {   
    this.idAssure = idAssure;
    this.router.navigate(['/assures/conditions-particulieres']);
  }

  /**
   * Change l'état de la page "en chargement"(false) <==> "affichée"(true)
   */
  doneRequesting(value?: boolean) {
    if(value != null)
      this.isRequesting = value;
    else if (this.isRequesting)
        this.isRequesting = false;
      else 
        this.isRequesting = true;
  }

}
