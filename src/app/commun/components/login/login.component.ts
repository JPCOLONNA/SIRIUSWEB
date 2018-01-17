import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MixinService } from '../../../core/providers/mixin.service';
import { MenuEvent } from '../../../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../../../core/broadcast/application-info-event';
import { Router } from '@angular/router';
import { ResourcesService } from '../../../core/providers/resources.service';

/**
 * Formulaire d'authentification en attendant la mise en place de SSO<br />
 * Sauvegarde en localStorage le nom de l'utilisateur saisi
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** Nom du formulaire d'authentification */
  formLogin: FormGroup;

  /**
   * Créer une instance du composant LoginComponent
   * @param resourcesService        Services de ressources pour toute les applications
   * @param mixinService            Services généraux
   * @param menuEvent               Contenu du menu tous les liens possibles, reçu via un evènement (chargement d'écran)
   * @param applicationInfoEvent    Informations de l'application reçues via un evènement (chargement d'écran)
   * @param formBuilder 
   * @param router 
   */
  constructor(
    private resourcesService: ResourcesService,
    private mixinService: MixinService, 
    private menuEvent: MenuEvent,
    private applicationInfoEvent: ApplicationInfoEvent,
    private formBuilder: FormBuilder,
    private router: Router,
     ) { 
    
      //Construit le formulaire
      this.createForms();
  }

  /**
   * Initialise le composant et de ses variables<br/>
   * Initialise le menu => vide<br />
   * Initialise les informations de l'application => vide
   */
  ngOnInit() {
    //MAJ du menu - aucun menu car aucune application sélectionnée
    this.menuEvent.fire("");
    //MAJ du nom de l'application - aucun information d'application car aucune application sélectionnée
    this.applicationInfoEvent.fire("");

  }

  /**
   * Création du formulaire d'authentification
   */
  createForms(): void {
    this.formLogin = this.formBuilder.group({
      login: ['', Validators.required]
    });
  }

  /**
   * Validation du formulaire d'authentification<br />
   * Sauvegarde en mémoire (localStorage) le login utilisateur
   * Redirige vers la liste des applications (Home de SIRIUS WEB)
   */
  onSubmit()
  {
    //Sauvegarde en mémoire (localStorage) le login utilisateur
    this.mixinService.storeInSession("UserCode", this.formLogin.value.login);
    
    //Redirige vers la page d'accueil de l'application 
    this.router.navigate(["/"]);
  }
}
