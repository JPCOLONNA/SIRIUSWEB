import { Injectable }       from '@angular/core';
import { Router }           from '@angular/router';
import { Observable }       from 'rxjs/Rx';
import { SettingsService }  from './settings.service';
import { ExceptionService } from './exception.service';
import { MixinService }     from './mixin.service';
import { AutorisationService } from 'app/core/providers/autorisation.service';
import { logging } from 'selenium-webdriver';

/**
 * Service lié à l'authentification, gestion des accès aux pages
 */
@Injectable()
export class AuthService {

    /** Configuration générale */
    settings: any;

    /** Environnement d'éxécution : recette(=développement), production */
    environment: any;

    /**
     * Crée une instance de AuthService
     * @param settingsService       Service de la configuration générale
     * @param exceptionService      Services de gestion des exceptions
     * @param router
     * @param mixinService          Services généraux
     */ 
    constructor(
        private settingsService: SettingsService,
        private exceptionService: ExceptionService,
        private mixinService: MixinService,
        private router: Router,
        private autorisationService:AutorisationService
    ) {
        this.settings = this.settingsService.get().webservices;
        this.environment = this.settingsService.getEnvironnement();
    }

    /**
     * Connection à l'application
     */
    login() {
        this.router.navigate(["/login"]);
    }

    /**
     * Vérifie si l'utilisateur est connecté
     * @return {boolean}
     */
    isLoggedIn() {
        return (this.mixinService.getFromSession("UserCode") != null 
            && this.mixinService.getFromSession("UserCode") != undefined 
            && this.mixinService.getFromSession("UserCode") != "");
    }

    /**
     * Déconnecte l'utilisateur, efface la session utilisateur
     */
    logout(): void {
        //TO DO this.mixinService.clearSession();
        this.router.navigate(['/login']);
    }
}
