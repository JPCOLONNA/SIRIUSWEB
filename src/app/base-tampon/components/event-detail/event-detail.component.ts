import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTamponService } from 'app/base-tampon/providers/base-tampon.service';
import { ResourcesService } from 'app/core/providers/resources.service';
import { ResourcesBaseTamponService } from 'app/base-tampon/providers/resources-base-tampon.service';
import { AutorisationService } from 'app/core/providers/autorisation.service';
import { NotificationsService } from 'angular2-notifications';

import { Assure } from '../../model/assure';
import { Couverture } from '../../model/couverture';
import { Iban } from '../../model/iban';
import { Salarie } from '../../model/salarie';

/**
 * Détail d'une action/évènement de la base tampon
 */
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  /** Liste des infos assuré à afficher */
  listAssures: Array<Assure>;

  /** Liste des bénéficiaires à afficher */
  listBeneficiaires: Array<Assure>;

  /** Liste des couvertures à afficher */
  listCouvertures: Array<Couverture>;

  /** Liste des couvertures bénéficiaires à afficher */
  listCouverturesBeneficiaires: Array<Couverture>;

  /** Liste des infos salariés à afficher */
  listInfosSalaries: Array<Salarie>;

  /** Liste des infos salariés à afficher */
  listInfosIban: Array<Iban>;



  // --------------------- Ressources -----------------------
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc: any;
  /** Ressources "BASE TAMPON" : label de l'application "Base tampon" <br />Fichier : _base-tampon-resources.json */
  rscBaseTampon: any;

  /** Action effectuée sur l'écran */
  action: any;

  /** Liste des choix du menu et leurs paramètres */
  menuDetail: any;

  /** Identifiant de l'action/évènement à afficher */
  idStockage: number;     //Initier par le composant parent lors du chargement du composant (router-outlet)

  /** Nom de l'écran du détail de l'évènement à afficher. <br/>
   * <i><u>Valeurs :</u><br/>
   * assure => Information de l'assuré (XTRTMPASS) <br/>
   * beneficiaires => Information des bénéficiaires (XTRTMPBEN) <br/>
   * couvertureAss => Information de la couverture de l'assuré (XTRTMPCOUV) <br/>
   * couvertureBenef => Information de la couverture des assurés (XTRTMPCOVB) <br/>
   * infoSalarie => Informations d'un salarié (XTRTMPSAL) <br/>
   * infoRib => Information des bénéficiaires (XTRTMPRIB) <br/>
   * documents => Information des bénéficiaires (XTRTMPEVD) <br />
   * anomalies => Listes des anomalies rencontrées dans le processus GED (XTRTMPANO) </i> */
  screen: string;

  /** Détail de l'action - données */
  eventDetail: any;

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;

  /** Flag pour la gestion de l'affichage du menu "Base tampon" */
  sidenavIsOpened: boolean;

  /**
   * Créer une instance du composant EventDetailComponent<br />
   * @param resourcesBaseTamponService      Services de ressources pour l'application "BASE TAMPON" 
   * @param resourcesService                Services de ressources pour toute les applications
   * @param baseTamponService               Services de l'application "BASE TAMPON"
   * @param autorisationService             Services de la gestions de droits d'accès
   * @param router 
   */
  constructor(
    private resourcesBaseTamponService: ResourcesBaseTamponService,
    private resourcesService: ResourcesService,
    private baseTamponService: BaseTamponService,
    private autorisationService: AutorisationService,
    private notificationsService: NotificationsService,
    private router: Router) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources et les données<br />
   * Controle les paramètres en entrée
   */
  ngOnInit() {
    //Si l'idStockage n'est pas connu, redirection vers la liste des évènements
    if (this.idStockage == 0 || this.idStockage == null)
      this.router.navigate(['/tampon/liste']);

    //Ressources
    this.rsc = this.resourcesService.get();
    this.rscBaseTampon = this.resourcesBaseTamponService.get();
    this.menuDetail = this.rscBaseTampon.eventDetail.menu;

    //Droits d'accès
    if (this.autorisationService.isAutorise("WVADETAIL", "modifier"))
      this.action = "modifier";
    else
      this.action = "modifier"; //"consulter"

    //Récupération des données
    this.loadEventDetail();
   
  }

loadEventDetail() {

        this.baseTamponService.loadEventDetails(this.idStockage+"","").subscribe(
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
        this.eventDetail= JSON.parse(JSON.stringify(data)).DetailEvt[0];
        console.log(this.eventDetail);
        //Liste des évènements 
        this.listAssures = new Array<Assure>();
        if (this.eventDetail.Liste_assure)
        for (let assure of this.eventDetail.Liste_assure) {
          this.listAssures.push(new Assure(assure));
        }

         this.listBeneficiaires = new Array<Assure>();
        if (this.eventDetail.Liste_beneficiaires)
        for (let assure of this.eventDetail.Liste_beneficiaires) {
          this.listBeneficiaires.push(new Assure(assure));
        }

        this.listCouvertures = new Array<Couverture>();
        if (this.eventDetail.Liste_couverture_assure)
        for (let couverture of this.eventDetail.Liste_couverture_assure) {
          this.listCouvertures.push(new Couverture(couverture));
        }

        this.listCouverturesBeneficiaires = new Array<Couverture>();
        if (this.eventDetail.Liste_couverture_beneficiaire)
        for (let couverture of this.eventDetail.Liste_couverture_beneficiaire) {
          this.listCouverturesBeneficiaires.push(new Couverture(couverture));
        }

        this.listInfosSalaries = new Array<Salarie>();
        if (this.eventDetail.Liste_infos_salarie)
        for (let salarie of this.eventDetail.Liste_infos_salarie) {
          this.listInfosSalaries.push(new Salarie(salarie));
        }

        this.listInfosIban = new Array<Iban>();
        if (this.eventDetail.Liste_rib)
        for (let iban of this.eventDetail.Liste_rib) {
          this.listInfosIban.push(new Iban(iban));
        }

        //détermine l'écran par défaut selon les données reçues
        this.screen = this.screenDefault();

        this.doneRequesting();
      },
      (err) => {
        this.notificationsService.error('Erreur', err);
      }
    );
}

  /**
   * Récupère le détail d'une action/évènement
   */
  getEventDetailMock() {
    this.baseTamponService.getDetailEvenement(this.idStockage)
      .subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.eventDetail = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/
        this.eventDetail = data;


        this.listAssures = new Array<Assure>();
        if (this.eventDetail.liste_assure)
        for (let assure of this.eventDetail.liste_assure) {
          this.listAssures.push(new Assure(assure));
        }

        this.listBeneficiaires = new Array<Assure>();
        if (this.eventDetail.liste_beneficiaires)
        for (let assure of this.eventDetail.liste_beneficiaires) {
          this.listBeneficiaires.push(new Assure(assure));
        }

        this.listCouvertures = new Array<Couverture>();
        if (this.eventDetail.liste_couverture_assure)
        for (let couverture of this.eventDetail.liste_couverture_assure) {
          this.listCouvertures.push(new Couverture(couverture));
        }

        this.listCouverturesBeneficiaires = new Array<Couverture>();
        if (this.eventDetail.liste_couverture_beneficiaire)
        for (let couverture of this.eventDetail.liste_couverture_beneficiaire) {
          this.listCouverturesBeneficiaires.push(new Couverture(couverture));
        }

        this.listInfosSalaries = new Array<Salarie>();
        if (this.eventDetail.liste_infos_salarie)
        for (let salarie of this.eventDetail.liste_infos_salarie) {
          this.listInfosSalaries.push(new Salarie(salarie));
        }

        this.listInfosIban = new Array<Iban>();
        if (this.eventDetail.liste_rib)
        for (let iban of this.eventDetail.liste_rib) {
          this.listInfosIban.push(new Iban(iban));
        }

        //détermine l'écran par défaut selon les données reçues
        this.screen = this.screenDefault();

        this.doneRequesting();
        
      }
      );
  }

  screenDefault() {
    if (this.eventDetail.liste_assure != '') return this.menuDetail.assures.codeEcran;
    if (this.eventDetail.liste_couverture_assure != '') return this.menuDetail.couvertureAss.codeEcran;
    if (this.eventDetail.liste_beneficiaires != '') return this.menuDetail.beneficiaires.codeEcran;
    if (this.eventDetail.liste_couverture_beneficiaire != '') return this.menuDetail.couvertureBenef.codeEcran;
    if (this.eventDetail.liste_rib != '') return this.menuDetail.infoRib.codeEcran;
    if (this.eventDetail.liste_infos_salarie != '') return this.menuDetail.infoSalarie.codeEcran;
    if (this.eventDetail.documents != '') return this.menuDetail.documents.codeEcran;
    if (this.eventDetail.anomalies != '') return this.menuDetail.anomalies.codeEcran;
  }

  /**
   * Change le nom d'écran à afficher dans le détail des éléments de la base tampon
   * @param screen Nom de l'écran à afficher
   */
  onChangeScreen(screen: string) {
    this.screen = screen;
  }

  /**
   * Change l'état de la page "en chargement" <==> "affichée"
   */
  doneRequesting() {
    if (this.isRequesting) {
      this.isRequesting = false;
    }
  }

}
