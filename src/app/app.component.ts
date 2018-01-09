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
  
  //Propriétés
  /**
   * Liste des applications
   */
  listeApplications: Array <any>;
  /** Environnement d'éxécution*/
  environnement: any;
  /** Nom de l'environnement */
  nomEnvironnement: string;
  //Information de l'application
  infoApplication: any;
  /** Nom de l'application */
  nomApplication: string;/** test nom de l'application */
  iconApplication: string;/** Icone de l'application */
  dateDuJour: Date;
  nomEcran: string;
  messages: string;
  messageAffiche: boolean;

  constructor(
    private settingsService: SettingsService,
    private mixinService: MixinService,
    private resourcesService: ResourcesService,
    private applicationInfoEvent: ApplicationInfoEvent,
    public auth: AuthService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
    ) {  }

  ngOnInit()
  {
    this.environnement = this.settingsService.getEnvironnement();
    this.nomEnvironnement = this.environnement.nomEnvironnement;
    this.listeApplications = this.resourcesService.get().listeApplications;

    //Récupération des informations de l'application chargée
    this.applicationInfoEvent.on().subscribe((res) => {
      if(res != "")
      {
        this.infoApplication = JSON.parse(res) ;
        this.iconApplication = "fa no-click "+this.infoApplication.icon;
        this.nomApplication = this.infoApplication.nom;
      }
      else
      {
        this.infoApplication = "" ;
        this.iconApplication = "";
        this.nomApplication = "";
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
  onChangeNomEcran($event)
  {
    this.nomEcran = $event;
  }

}
