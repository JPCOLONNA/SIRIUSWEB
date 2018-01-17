import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { PythieService } from '../../../pythie/providers/pythie.service';
import { ExceptionService } from '../../../core/providers/exception.service';
import { NotificationsService } from 'angular2-notifications';
import { AssuresService } from '../../providers/assures.service';
import { SocietesService } from '../../providers/societes.service';
import { MatDatepickerInputEvent } from '@angular/material';

/** 
 * Affiche les conditions particulières d'un assuré<br />
 * Restitution du paramétrage de PYTHIE
 */
@Component({
  selector: 'app-conditions-particulieres',
  templateUrl: './conditions-particulieres.component.html',
  styleUrls: ['./conditions-particulieres.component.scss']
})
export class ConditionsParticulieresComponent implements OnInit {

  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;

  /** Identifiant de l'assuré concerné par les conditions particulières */
  idAssure: number;     //Initier par le composant parent lors du chargement du composant (router-outlet)
  
  /** Nom de l'écran du détail des conditions particulières à afficher. <br/>
   * <i><u>Valeurs :</u><br/>
   * informations => Information générales (par défaut) <br/>
   * actions => Listes des actions possibles pour l'assuré</i> */
  screen: string;

  /** Date d'application de la branche CP */
  dateApplication: Date;

  /** Données des conditions particulières pour un assuré  */
  brancheCP: any;
  
  /** Informations de l'assuré */
  infoAssure: any;

  /** Informations de la société FM liée à l'assuré */
  infoSocieteFM: any;

  /** Flag pour la gestion de l'affichage du menu "Condition particulières" */
  sidenavIsOpened: boolean;

  /**
   * Crée une instance du composant ConditionsParticulieresComponent
   * @param router                
   * @param exceptionService      Services de gestion des exceptions
   * @param notificationsService  Services de notifications de bas de page
   * @param pythieService         Services de l'application "PYTHIE"
   * @param assuresService        Services de l'application "ASSURES" - données liées à un assuré
   * @param societesService       Services de l'application "ASSURES" - données liées à une société
   */
  constructor(
    private router: Router, 
    private exceptionService: ExceptionService,
    private notificationsService: NotificationsService,
    private pythieService: PythieService,
    private assuresService: AssuresService,
    private societesService: SocietesService) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère des données à afficher
   */
  ngOnInit() {
    //Par défaut l'écran est l'écran d'information générales
    this.screen = "informations";

    //Si l'identifiant assuré n'est pas connu, redirection vers la recherche d'un assuré
    if(this.idAssure == 0 || this.idAssure == null)
      this.router.navigate(['/assures']);
    
    //Initialise la date d'application à la date du jour.
    this.dateApplication = new Date();

    //Récupération des données
    this.getAssure();                     //Informations assuré
    this.getSociete();                    //Informations société
    this.getConditionsParticulieres();    //conditions particulières
  }

  /**
   * Change l'état de la page "en chargement" <==> "affichée"
   */
  doneRequesting() {
    if (this.isRequesting)
      this.isRequesting = false;

  }

  /**
   * Récupération des informations d'un assuré
   */
  getAssure()
  {
    this.assuresService.getAssure(this.idAssure)
    .subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.brancheCP = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/
        this.infoAssure = data;
      },
      (err) => {
        this.notificationsService.error('Erreur', err);
      }
    );
  }

  /**
   * Récupération des informations d'une société
   */
  getSociete()
  {
    //Ajouter en paramètre d'appel de service le type de société recherchée, par défaut FM
    //Ajouter en paramètre d'appel de service la date d'application recherchée, par défaut la date du jour
    this.societesService.getSocieteFM(this.idAssure)
    .subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.infoSocieteFM = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/
        this.infoSocieteFM = data;
      },
      (err) => {
        this.notificationsService.error('Erreur', err);
      }
    );
  }

  /**
   * Récupération des conditions particulières pour un assuré = détail d'une branche CP de PYTHIE
   */
  getConditionsParticulieres()
  {
    this.pythieService.getConditionsParticulieres()
    .subscribe(
      (data) => {
        //TO DO A activer lors de l'appel du service
        /*if (data.hasOwnProperty('success') && data.success === 'true') {
          this.brancheCP = data;
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (err) => {
            this.notificationsService.error('Erreur', err);
          });
        }*/
        this.brancheCP = data;
        this.doneRequesting();
      },
      (err) => {
        this.notificationsService.error('Erreur', err);
        this.doneRequesting();
      },
      () => {
        this.doneRequesting();

      }
    );
  }

  /**
   * Change le nom d'écran à afficher dans le détail des conditions particulières
   * @param screen Nom de l'écran à afficher
   */
  onChangeScreen(screen: string)
  {
    this.screen = screen;
  }

  /**
   * Lors du changement de la date d'application relance la recherche et l'affichage des conditons particulières
   * @param event   Evènement reçu lors du changement de date d'application
   */
  changeDateApplication(event: MatDatepickerInputEvent<Date>) {
    this.isRequesting = true;
    this.getSociete();
    this.getConditionsParticulieres();
  }
}


