import { Component, OnInit } from '@angular/core';
import { MenuEvent } from '../../../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../../../core/broadcast/application-info-event';
import { ResourcesService } from '../../../core/providers/resources.service';
import { MixinService } from '../../../core/providers/mixin.service';
import { Router } from '@angular/router';
import { AutorisationService } from 'app/core/providers/autorisation.service';
import { ExceptionService } from 'app/core/providers/exception.service';
import { Application } from 'app/core/models/Applications';

/**
 * Liste les applications sous forme de bouton 
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** Ressources générales */
  rsc:any;

  /** Liste des applications */
  listApplication:Array<Application> = new Array<Application>();

  /**
   * Créer une instance du composant HomeComponent
   * @param resourcesService      Services de ressources pour toute les applications
   * @param mixinService          Services généraux
   * @param menuEvent             Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   * @param applicationInfoEvent  Informations de l'application reçues via un evènement (chargement d'écran)
   * @param router 
   */
  constructor(private resourcesService: ResourcesService,
    private mixinService: MixinService,
    private menuEvent: MenuEvent, 
    private applicationInfoEvent: ApplicationInfoEvent,
    private router: Router,
    private autorisationService:AutorisationService,
    private exceptionService: ExceptionService) { }

  /**
   * Initialise le composant HomeComponent<br />
   * Initialise le menu => vide<br />
   * Initialise les informations de l'application => vide
   */
  ngOnInit() {
    //MAJ du menu - aucun menu car aucune application sélectionnée
    this.menuEvent.fire("");
    //MAJ du nom de l'application - aucun information d'application car aucune application sélectionnée
    this.applicationInfoEvent.fire("");

    this.rsc = this.resourcesService.get();

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
   * Redirige l'utilisateur vers l'application sélectionnée, change l'url du navigateur 
   * @param lien      Url de l'application
   */
  redirectTo(lien: string)
  {
    this.router.navigate([lien]);
  }

}
