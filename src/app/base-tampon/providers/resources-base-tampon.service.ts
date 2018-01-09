import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuEvent } from '../../core/broadcast/menu-event';
import { ApplicationInfoEvent } from '../../core/broadcast/application-info-event';
import { MixinService } from "../../core/providers/mixin.service";

/**
 * Services de ressources pour l'application "ASSURES"
 */
@Injectable()
export class ResourcesBaseTamponService {

    /** Ressources "ASSURES" : label de l'application "ASSURE"<br /> Fichier : resources/_assures-resources.json */
    rsc: any;

    /**
     * Crée une instance de ResourcesAssuresService
     * @param http 
     */
    constructor(
        private http: HttpClient,
        private mixinService:MixinService) {
    }
    
    /**
     * Charges les ressources de l'application "ASSURES"<br />
     * Fichier : resources/_assures-resources.json
     */
    load() {
        let headers = this.mixinService.getDefaultHeaders();

        //Récupère le fichier de ressource et met à jour le contenu du menu récupéré dans menu-navigation, le nom de l'application et le nom de l'écran par défaut(accueil pythie)
        return new Promise(resolve => {
            this.http
                .get("resources/_base-tampon-resources.json", { headers: headers })
                .subscribe(
                (rsc) => {
                    //Ressources complète de l'application
                    this.rsc = rsc;

                    resolve(true);
                },
                (error) => console.log(error),
                () => console.log("Resources base tampon loaded")
                );
        });
    }

    /**
     * Retourne les ressources de l'application "ASSURES"
     */
    get() {
        return this.rsc;
    }
}
