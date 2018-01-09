import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuEvent } from '../../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../../core/broadcast/application-info-event';

import "rxjs/add/operator/map";
import { MixinService } from "../../core/providers/mixin.service";
import { Observable } from "rxjs/Observable";

/**
 * Service to handle global application resources
 *
 * @export
 * @class ResourcesPythieService
 */
@Injectable()
export class ResourcesPythieService {
    rsc: any;

    /**
     * Creates an instance of ResourcesPythieService.
     * @param {Http} http
     */
    constructor(
        private http: HttpClient,
        private mixinService: MixinService,
        private menuEvent: MenuEvent,
        private applicationInfoEvent: ApplicationInfoEvent) {
    }
    
    /**
     * Load application resources
     *
     * @param {() => any} [callback]
     * @returns {Promise}
     *
     * @memberOf ResourcesPythieService
     */
    load() {
        let headers = this.mixinService.getDefaultHeaders();

        //Récupère le fichier de ressource et met à jour le contenu du menu récupéré dans menu-navigation, le nom de l'application et le nom de l'écran par défaut(accueil pythie)
        return new Promise(resolve => {
            this.http
                .get("resources/_pythie-resources.json", { headers: headers })
                .subscribe(
                (rsc) => {
                    //Ressources complète de l'application
                    this.rsc = rsc;
                    
                    /*//MAJ du menu
                    this.menuEvent.fire(JSON.stringify(this.rsc.menu));

                    //MAJ du nom de l'application
                    this.applicationInfoEvent.fire(JSON.stringify(this.rsc.infoApplication));

                    //MAJ du nom de l'écran
                    this.mixinService.majInfoEcran(this.rsc.ecrans.home);*/

                    resolve(true);
                },
                (error) => console.log(error),
                () => console.log("Resources pythie loaded")
                );
        });
    }

    /**
     * Read resources
     * @returns {any}
     */
    get() {
        return this.rsc;
    }


    
}
