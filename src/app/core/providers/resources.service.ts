import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import "rxjs/add/operator/map";
import { MixinService } from "app/core/providers/mixin.service";

/**
 * Service to handle global application resources
 *
 * @export
 * @class ResourcesService
 */
@Injectable()
export class ResourcesService {
    rsc: any;

    /**
     * Creates an instance of ResourcesService.
     * @param {Http} http
     */
    constructor(
        private http: HttpClient,
        private mixinService: MixinService
    ) {};

    /**
     * Load application resources
     *
     * @param {() => any} [callback]
     * @returns {Promise}
     *
     * @memberOf ResourcesService
     */
    load() {
        let headers = this.mixinService.getDefaultHeaders();

        return new Promise(resolve => {
            this.http
                .get("resources/_resources.json", { headers: headers })
                .subscribe(
                (rsc) => {
                    this.rsc = rsc;
                    resolve(true);
                },
                (error) => console.log(error),
                () => console.log("Resources loaded")
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
