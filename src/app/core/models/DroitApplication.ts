import { Autorisation } from "app/core/models/Autorisation";

export class DroitApplication {

    ecran: string;
    autorisations: Array<Autorisation> = new Array<Autorisation>();
    
    constructor(tab: any) {
      this.ecran = tab.ecran ? tab.ecran : '...';
      this.autorisations.push(new Autorisation(tab.autorisations));
    }
}
