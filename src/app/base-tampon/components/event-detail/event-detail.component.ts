import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BaseTamponService } from 'app/base-tampon/providers/base-tampon.service';
import { ResourcesService } from 'app/core/providers/resources.service';
import { ResourcesBaseTamponService } from 'app/base-tampon/providers/resources-base-tampon.service';
import { AutorisationService } from 'app/core/providers/autorisation.service';
import { Observable } from 'rxjs/Observable';

import { Assure } from '../../model/assure';
import { Couverture } from '../../model/couverture';
import { Iban } from '../../model/iban';
import { Salarie } from '../../model/salarie';
import { NotificationsService } from 'app/core/providers/notifications.service';

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

  DR_AJOUT_ASSURE: boolean = false;
  DR_AJOUT_BENEFICIAIRE: boolean = false;
  DR_AJOUT_COUVERTURE: boolean = false;
  DR_AJOUT_COUVERTURE_BENEFICIAIRE: boolean = false;
  DR_AJOUT_INFOS_SALARIALES: boolean = false;
  DR_AJOUT_IBAN: boolean = false;

  DR_SUPPR_ASSURE: boolean = false;
  DR_SUPPR_BENEFICIAIRE: boolean = false;
  DR_SUPPR_COUVERTURE: boolean = false;
  DR_SUPPR_COUVERTURE_BENEFICIAIRE: boolean = false;
  DR_SUPPR_INFOS_SALARIALES: boolean = false;
  DR_SUPPR_IBAN: boolean = false;


  parameters: any;

  /** Liste des choix du menu et leurs paramètres */
  menuDetail: any;

  /** Identifiant de l'action/évènement à afficher */
  idStockage: number;     //Initier par le composant parent lors du chargement du composant (router-outlet)
  idEvt: number;
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
    private route: ActivatedRoute,
    private router: Router) { }


  loadParameters() {
    this.baseTamponService.loadParameters().subscribe(
      (data) => {
        this.parameters = JSON.parse(JSON.stringify(data));
        console.log(this.parameters);
      }
    );
  }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources et les données<br />
   * Controle les paramètres en entrée
   */
  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idstockage')) {
      this.idStockage=parseInt(this.route.snapshot.paramMap.get('idstockage'));
    }
    //Si l'idStockage n'est pas connu, redirection vers la liste des évènements
    if (( this.idStockage == 0 || this.idStockage == null) && (this.idEvt == 0 || this.idEvt == null))
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

    if (this.autorisationService.isAutorise("WVADETAILASS", "creer")) {
      this.DR_AJOUT_ASSURE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILBENEF", "creer")) {
      this.DR_AJOUT_BENEFICIAIRE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILCOUV", "creer")) {
      this.DR_AJOUT_COUVERTURE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILCOVBEN", "creer")) {
      this.DR_AJOUT_COUVERTURE_BENEFICIAIRE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILINFSAL", "creer")) {
      this.DR_AJOUT_INFOS_SALARIALES = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILIBAN", "creer")) {
      this.DR_AJOUT_IBAN = true;
    }



    if (this.autorisationService.isAutorise("WVADETAILASS", "supprimer")) {
      this.DR_SUPPR_ASSURE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILBENEF", "supprimer")) {
      this.DR_SUPPR_BENEFICIAIRE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILCOUV", "supprimer")) {
      this.DR_SUPPR_COUVERTURE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILCOVBEN", "supprimer")) {
      this.DR_SUPPR_COUVERTURE_BENEFICIAIRE = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILINFSAL", "supprimer")) {
      this.DR_SUPPR_INFOS_SALARIALES = true;
    }
    if (this.autorisationService.isAutorise("WVADETAILIBAN", "supprimer")) {
      this.DR_SUPPR_IBAN = true;
    }

    
    //Récupération des données
    Observable.forkJoin(this.baseTamponService.loadEventDetails(this.idStockage + "", this.idEvt + "", ""), this.baseTamponService.loadParameters()).subscribe(
      results => {

        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.brancheCP = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/

        //Cast le résultat de type "object" en structure JSON
        this.eventDetail = JSON.parse(JSON.stringify(results[0]));

        if (this.eventDetail.DetailEvt.id_evenement)
          this.idEvt = this.eventDetail.DetailEvt.id_evenement;

        if (this.eventDetail.DetailEvt.id_stockage)
          this.idStockage = this.eventDetail.DetailEvt.id_stockage;

        //Liste des évènements 
        this.listAssures = new Array<Assure>();
        let tmp = 1;
        if (this.eventDetail.Liste_assure)
          for (let assure of this.eventDetail.Liste_assure) {
            if (JSON.stringify(assure) !== this.rsc.JsonBlank) {
              this.listAssures.push(new Assure(assure, tmp));
              tmp = tmp + 1;
            }
          }

        tmp = 1;
        this.listBeneficiaires = new Array<Assure>();
        if (this.eventDetail.Liste_beneficiaire)
          for (let assure of this.eventDetail.Liste_beneficiaire) {
            if (JSON.stringify(assure) !== this.rsc.JsonBlank) {
              this.listBeneficiaires.push(new Assure(assure, tmp));
              tmp = tmp + 1;
            }
          }

        tmp = 1;
        this.listCouvertures = new Array<Couverture>();
        if (this.eventDetail.Liste_couverture_assure)
          for (let couverture of this.eventDetail.Liste_couverture_assure) {
            if (JSON.stringify(couverture) !== this.rsc.JsonBlank) {
              this.listCouvertures.push(new Couverture(couverture, tmp));
              tmp = tmp + 1;
            }
          }

        tmp = 1;
        this.listCouverturesBeneficiaires = new Array<Couverture>();
        if (this.eventDetail.Liste_couverture_beneficiaire)
          for (let couverture of this.eventDetail.Liste_couverture_beneficiaire) {
            if (JSON.stringify(couverture) !== this.rsc.JsonBlank) {
              this.listCouverturesBeneficiaires.push(new Couverture(couverture, tmp));
              tmp = tmp + 1;
            }
          }

        tmp = 1;
        this.listInfosSalaries = new Array<Salarie>();
        if (this.eventDetail.Liste_salarie)
          for (let salarie of this.eventDetail.Liste_salarie) {
            if (JSON.stringify(salarie) !== this.rsc.JsonBlank) {
              this.listInfosSalaries.push(new Salarie(salarie, tmp));
              tmp = tmp + 1;
            }
          }

        tmp = 1;
        this.listInfosIban = new Array<Iban>();
        if (this.eventDetail.Liste_rib)
          for (let iban of this.eventDetail.Liste_rib) {
            if (JSON.stringify(iban) !== this.rsc.JsonBlank) {
              this.listInfosIban.push(new Iban(iban, tmp));
              tmp = tmp + 1;
            }
          }

        //détermine l'écran par défaut selon les données reçues
        this.screen = this.screenDefault();

        this.parameters = JSON.parse(JSON.stringify(results[1]));
        //console.log("params"+JSON.stringify(results[1]));

        this.doneRequesting();

      },
      error => {
        this.notificationsService.displayError(error);
      }
    );

  }

  deleteAssure($event) {
    let index = 1;
    for (var i = 0; i < this.listAssures.length; i++) {
      if (this.listAssures[i].num === $event) {
        index = i;
      }
    }
    this.listAssures.splice(index, 1);
  }

  deleteBenef($event) {
    let index = 1;
    for (var i = 0; i < this.listBeneficiaires.length; i++) {
      if (this.listBeneficiaires[i].num === $event) {
        index = i;
      }
    }
    this.listBeneficiaires.splice(index, 1);
  }

  deleteCouverture($event) {
    let index = 1;
    for (var i = 0; i < this.listCouvertures.length; i++) {
      if (this.listCouvertures[i].num === $event) {
        index = i;
      }
    }
    this.listCouvertures.splice(index, 1);
  }

  deleteCouvertureBenef($event) {
    let index = 1;
    for (var i = 0; i < this.listCouverturesBeneficiaires.length; i++) {
      if (this.listCouverturesBeneficiaires[i].num === $event) {
        index = i;
      }
    }
    this.listCouverturesBeneficiaires.splice(index, 1);
  }

  deleteInfosSalaries($event) {
    let index = 1;
    for (var i = 0; i < this.listInfosSalaries.length; i++) {
      if (this.listInfosSalaries[i].num === $event) {
        index = i;
      }
    }
    this.listInfosSalaries.splice(index, 1);
  }

  deleteIban($event) {
    let index = 1;
    for (var i = 0; i < this.listInfosIban.length; i++) {
      if (this.listInfosIban[i].num === $event) {
        index = i;
      }
    }
    this.listInfosIban.splice(index, 1);
  }

  add($event) {
    if ($event === this.rsc.CONSTS.AJOUT_ASSURE) {
      let index = this.listAssures.length + 1;
      this.listAssures.push(new Assure("", index));
    }

    if ($event === this.rsc.CONSTS.AJOUT_BENEFICIAIRE) {
      let index = this.listBeneficiaires.length + 1;
      this.listBeneficiaires.push(new Assure("", index));
    }

    if ($event === this.rsc.CONSTS.AJOUT_COUVERTURE) {
      let index = this.listCouvertures.length + 1;
      this.listCouvertures.push(new Couverture("", index));
    }
    if ($event === this.rsc.CONSTS.AJOUT_COUVERTURE_BENEFICIAIRE) {
      let index = this.listCouverturesBeneficiaires.length + 1;
      this.listCouverturesBeneficiaires.push(new Couverture("", index));
    }
    if ($event === this.rsc.CONSTS.AJOUT_INFOS_SALARIALES) {
      let index = this.listInfosSalaries.length + 1;
      this.listInfosSalaries.push(new Salarie("", index));
    }
    if ($event === this.rsc.CONSTS.AJOUT_IBAN) {
      let index = this.listInfosIban.length + 1;
      this.listInfosIban.push(new Iban("", index));
    }




  }

  screenDefault() {
    if (this.listAssures.length > 0) return this.menuDetail.assures.codeEcran;
    if (this.listCouvertures.length > 0) return this.menuDetail.couvertureAss.codeEcran;
    if (this.listBeneficiaires.length > 0) return this.menuDetail.beneficiaires.codeEcran;
    if (this.listCouverturesBeneficiaires.length > 0) return this.menuDetail.couvertureBenef.codeEcran;
    if (this.listInfosIban.length > 0) return this.menuDetail.infoRib.codeEcran;
    if (this.listInfosSalaries.length > 0) return this.menuDetail.infoSalarie.codeEcran;
    //if (this.eventDetail.documents.length>0) return this.menuDetail.documents.codeEcran;
    //if (this.eventDetail.anomalies.length>0) return this.menuDetail.anomalies.codeEcran;
  }


  onSave() {
    this.loadEventDetail();
  }


  loadEventDetail() {

    this.baseTamponService.loadEventDetails(this.idStockage + "", this.idEvt + "", "").subscribe(
      (data) => {
        console.log(data);

        //Cast le résultat de type "object" en structure JSON
        this.eventDetail = JSON.parse(JSON.stringify(data));
        console.log(this.eventDetail);
        //Liste des évènements 
        let tmp: number = 1;

        this.listAssures = new Array<Assure>();
        if (this.eventDetail.Liste_assure) {
          tmp = 1;
          for (let assure of this.eventDetail.Liste_assure) {
            if (JSON.stringify(assure) !== this.rsc.JsonBlank) {
              this.listAssures.push(new Assure(assure, tmp));
              tmp = tmp + 1;
            }
          }
        }

        this.listBeneficiaires = new Array<Assure>();
        if (this.eventDetail.Liste_beneficiaire) {
          tmp = 1;
          for (let assure of this.eventDetail.Liste_beneficiaire) {
            if (JSON.stringify(assure) !== this.rsc.JsonBlank) {
              this.listBeneficiaires.push(new Assure(assure, tmp));
              tmp = tmp + 1;
            }
          }
        }

        this.listCouvertures = new Array<Couverture>();
        if (this.eventDetail.Liste_couverture_assure) {
          tmp = 1;
          for (let couverture of this.eventDetail.Liste_couverture_assure) {
            if (JSON.stringify(couverture) !== this.rsc.JsonBlank) {
              this.listCouvertures.push(new Couverture(couverture, tmp));
              tmp = tmp + 1;
            }
          }
        }

        this.listCouverturesBeneficiaires = new Array<Couverture>();
        if (this.eventDetail.Liste_couverture_beneficiaire) {
          tmp = 1;
          for (let couverture of this.eventDetail.Liste_couverture_beneficiaire) {
            if (JSON.stringify(couverture) !== this.rsc.JsonBlank) {
              this.listCouverturesBeneficiaires.push(new Couverture(couverture, tmp));
              tmp = tmp + 1;
            }
          }
        }

        this.listInfosSalaries = new Array<Salarie>();
        if (this.eventDetail.Liste_salarie) {
          tmp = 1;
          for (let salarie of this.eventDetail.Liste_salarie) {
            if (JSON.stringify(salarie) !== this.rsc.JsonBlank) {
              this.listInfosSalaries.push(new Salarie(salarie, tmp));
              tmp = tmp + 1;
            }
          }
        }

        this.listInfosIban = new Array<Iban>();
        if (this.eventDetail.Liste_rib) {
          tmp = 1;
          for (let iban of this.eventDetail.Liste_rib) {
            if (JSON.stringify(iban) !== this.rsc.JsonBlank) {
              this.listInfosIban.push(new Iban(iban, tmp));
              tmp = tmp + 1;
            }
          }
        }

        //détermine l'écran par défaut selon les données reçues
        this.screen = this.screenDefault();

      },
      (error) => {
        this.notificationsService.displayError(error);
      }
    );
  }

  generateParameters() {

    let JSONArg = JSON.parse('{}');
    if (this.idEvt) {
      JSONArg.idevenement = this.idEvt;
    } else {
      JSONArg.idevenement = "";
    }
    if (this.idStockage) {
      JSONArg.idstockage = this.idStockage;
    } else {
      JSONArg.idstockage = "";
    }

    return JSONArg;

  }

  validEvent() {
    this.baseTamponService.validEvent(this.generateParameters()).subscribe(data => {
      this.router.navigate(['/tampon/liste']);
    });
  }

  deleteEvent() {
    this.baseTamponService.deleteEvent(this.generateParameters()).subscribe(data => {
      this.router.navigate(['/tampon/liste']);
    });
  }

  /**
   * Récupère le détail d'une action/évènement
   */
  /*getEventDetailMock() {
    this.baseTamponService.getDetailEvenement(this.idStockage)
      .subscribe(
      (data) => {

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

        
        
      }
      );
  }*/



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
