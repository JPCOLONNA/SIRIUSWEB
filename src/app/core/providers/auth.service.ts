import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { Router }           from '@angular/router';
import { Observable }       from 'rxjs/Rx';
import { SettingsService }  from './settings.service';
import { ExceptionService } from './exception.service';
import { MixinService }     from './mixin.service';

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
     * @param http
     * @param settingsService       Service de la configuration générale
     * @param exceptionService      Services de gestion des exceptions
     * @param router
     * @param mixinService          Services généraux
     */ 
    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private exceptionService: ExceptionService,
        private mixinService: MixinService,
        private router: Router
    ) {
        this.settings = this.settingsService.get().webservices;
        this.environment = this.settingsService.getEnvironnement();
    }

    /**
     * Connection à l'application
     */
    login() {
        /* TO DO : Récupérer le nom de l'utilisateur via le header d'apache quand le SSO sur IBM i sera en place
         * Appeler une url du serveur d'apache de IBM i et récupérer la valeur de X-Remote-User
         * Config apache : https://serverfault.com/questions/207301/get-the-authenticated-user-under-apache
         * //sauvegarde de l'utilisateur en session
         * this.mixinService.storeInSession("currentUser", "SGAUTHIER");
         */

        this.router.navigate(["/login"]);

        //Charge en mémoire les droits
        //return this.autorisationService.getAutorisationUtil("SGAUTHIER");
    }

    /**
     * Vérifie si l'utilisateur est connecté
     * @return {boolean}
     */
    isLoggedIn() {
        const user = this.mixinService.getFromLocalStorage("currentUser");
        return user !== null;
    }

    /**
     * Déconnecte l'utilisateur, efface la session utilisateur
     */
    logout(): void {
        //TO DO this.mixinService.clearSession();
        this.router.navigate(['/login']);
    }
}
