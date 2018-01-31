import { Component, OnInit, platformCore } from '@angular/core';

import { ApplicationInfoEvent } from './core/broadcast/application-info-event';

/** SERVICES **/
import { SettingsService } from './core/providers/settings.service';
import { ResourcesService } from './core/providers/resources.service';
import { AuthService } from './core/providers/auth.service';
import { MatDialog } from '@angular/material';
import { ModalMessageComponent } from './commun/components/modal-message/modal-message.component';
import { MixinService } from './core/providers/mixin.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { AutorisationService } from 'app/core/providers/autorisation.service';
import { Application } from 'app/core/models/Applications';
import { ExceptionService } from 'app/core/providers/exception.service';
import { Router } from '@angular/router/';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


/**
 * @name appcomponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * @name appcomponent
 */
export class AppComponent {
  
  /** Flag pour la gestion de l'affichage du spinner de chargement */
  isRequesting = true;
  /** Ressources */
  rsc : any;
  /** Liste des applications */
  listApplication: Array <Application> = new Array<Application>();
  /** Filtre de recherche d'une application */
  filteredApplication: Observable<any[]>;
  /** Gestion du champs de saisi "Accès rapide" */
  formControlAppli: FormControl;
  /** Environnement d'éxécution*/
  environnement: any;
  /** Nom de l'environnement */
  environmentName: string;
  /**Information de l'application*/
  applicationInfo: any;
  /** Nom de l'application */
  applicationName: string;/** test nom de l'application */
  iconApplication: string;/** Icone de l'application */
  dateDuJour: Date;
  screenName: string;
  //Texte des messages à faire défiler
  messages: string;
  //Flag pour gérer l'affichage des messages
  messageAffiche: boolean;

  /** Nom de l'utilisateur connecté */
  userConnectedFullName: string;

  @ViewChild('autoInput', {read: ElementRef}) private autoInput: ElementRef;

  
  constructor(
    private settingsService: SettingsService,
    private mixinService: MixinService,
    private resourcesService: ResourcesService,
    private applicationInfoEvent: ApplicationInfoEvent,
    public auth: AuthService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public autorisationService: AutorisationService,
    public exceptionService: ExceptionService,
    private router: Router
    ) {  }

  ngOnInit()
  {
    this.rsc = this.resourcesService.get();
    this.environnement = this.settingsService.getEnvironnement();
    this.environmentName = environment.environmentName;

    //Récupération des informations de l'application chargée
    this.applicationInfoEvent.on().subscribe((res) => {
      if(res != "")
      {
        this.applicationInfo = JSON.parse(res) ;
        this.iconApplication = "fa no-click "+this.applicationInfo.icon;
        this.applicationName = this.applicationInfo.name;
      }
      else
      {
        this.applicationInfo = "" ;
        this.iconApplication = "";
        this.applicationName = "";
      }
    });

    //Affichage de la date/heure en temps réelle
    this.dateDuJour = new Date();
    setInterval (()=>{
      this.dateDuJour = new Date();
    },1000); 

    //TO DO : Récupération des messages pour le gestionnaire connecté
    //gestionnaire = this.mixinService.getFromLocalStorage("currentUser");
    this.messages = "Les messages défilants à communiquer au gestionnaire connecté.";

    //Par défaut le message est affiché
    this.messageAffiche = true;

    //Information utilisateur - nom complet si présent ou login windows
    if(this.userConnectedFullName == null || this.userConnectedFullName == undefined)
    {
      if(this.mixinService.getFromSession("UserCode")!= undefined)
        this.userConnectedFullName = this.mixinService.getFromSession("UserCode").toUpperCase().replace(/"/gi,'');
    }
    else
    {
      this.userConnectedFullName = this.mixinService.getFromSession("UserFullName").replace(/"/gi,'');
    }
      

    this.formControlAppli = new FormControl();
    //Récupération de la liste des applications
    this.autorisationService.getListApplication().subscribe(
      (data) => {
        if (data.hasOwnProperty('success') && data.success === 'true') {
          if(data.liste_application){
            //Pour chaque application, recherche les propriétés de l'application dans le fichier _resources.json
            for(let application of data.liste_application){
              var applicationTmp = new Application();
              applicationTmp.code = application.nom_application;
              applicationTmp.nom = this.rsc.listeApplications[application.nom_application].name;
              applicationTmp.icon = this.rsc.listeApplications[application.nom_application].icon;
              applicationTmp.url = this.rsc.listeApplications[application.nom_application].url;
              this.listApplication.push(applicationTmp);
            }
            this.filteredApplication = this.formControlAppli.valueChanges
              .pipe(
                startWith(''),
                map(application => application ? this.filterApplication(application) : this.listApplication.slice())
              );

            this.isRequesting = false;
          }
        } else {
          this.exceptionService.handleException(data).subscribe(() => {}, (error) => {
            this.exceptionService.error.next({type:0, msg:error});
          });
        }
      },
      (error) => {
        this.exceptionService.error.next({type:0, msg:error});
      }
    );
  }


  /**
   * Affiche/cache le message en défillement
   * @param affiche false = masque le message, true = affiche le message
   */
  afficheMessage(affiche: boolean)
  {
    this.messageAffiche = affiche;
  }


  /**
   * Affiche une modal avec tous les messages.
   */
  afficheModalMessage(): void {

    //Chargement de la modal, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalMessageComponent, {
      data: { route: this.activatedRoute }
    });
  }

  //récupère le nom de l'écran
  onChangeScreenName($event)
  {
    this.screenName = $event;
  }

  filterApplication(name: string) {
    return this.listApplication.filter(application =>
      application.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  /**
   * Méthode appelée lors de la selection d'une application dans accès rapide
   * @param  
   */
  selectOptionQuickAccess($event)
  {
    //redirige vers l'application sélectionnée
    this.router.navigate(['/' + $event.option.value]);
    //Supprime le texte sélectionné
    this.formControlAppli.reset();    
    //supprime le focus
    this.autoInput.nativeElement.blur();
  }
}
