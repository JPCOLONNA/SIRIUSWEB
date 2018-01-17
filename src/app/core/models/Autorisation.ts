export class Autorisation {

    executer: string;
    creer: string;
    modifier: string;
    supprimer: string;
    imprimer: string;
    exporter: string;
    
    constructor(tab: any) {
      this.executer     = tab.executer ? tab.executer : '...';
      this.creer        = tab.creer ? tab.creer : '...';
      this.modifier     = tab.modifier ? tab.modifier : '...';
      this.supprimer    = tab.supprimer ? tab.supprimer : '...';
      this.imprimer     = tab.imprimer ? tab.imprimer : '...';
      this.exporter     = tab.exporter ? tab.exporter : '...';
    }
}
