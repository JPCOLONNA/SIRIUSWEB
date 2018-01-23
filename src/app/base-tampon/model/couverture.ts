export class Couverture {

    id_evenement: string;
    id_assure: string;
    nom_assure: string;
    prenom_assure: string;
    debut_effet: string;
    fin_effet: string;
    id_societe: string;
    raison_sociale: string;
    code_option: string;
    lb_option: string;
    risque: string
    lb_risque: string;
    famille_produit: string;
    lb_famille_produit: string;
    produit: string;
    lb_produit: string;
    date_annulation: string;
    reference_client: string;
    statut: string;

    listeEvenements: Array<Couverture>;

    constructor(tab: any) {
        this.id_evenement = tab.id_evenement ? tab.id_evenement : "";
        this.id_assure = tab.id_assure ? tab.id_assure : "";
        this.nom_assure = tab.nom_assure ? tab.nom_assure : "";
        this.prenom_assure = tab.prenom_assure ? tab.prenom_assure : "";
        this.debut_effet = tab.debut_effet&&tab.debut_effet.length>7 ? tab.debut_effet.substr(0,4)+"-"+tab.debut_effet.substr(4,2)+"-"+tab.debut_effet.substr(6,2) : "";
        this.fin_effet = tab.fin_effet&&tab.fin_effet.length>7 ? tab.fin_effet.substr(0,4)+"-"+tab.fin_effet.substr(4,2)+"-"+tab.fin_effet.substr(6,2) : "";
        this.id_societe = tab.id_societe ? tab.id_societe : "";
        this.raison_sociale = tab.raison_sociale ? tab.raison_sociale : "";
        this.code_option = tab.code_option ? tab.code_option : "";
        this.lb_option = tab.lb_option ? tab.lb_option : "";
        this.risque = tab.risque ? tab.risque : "";
        this.lb_risque = tab.lb_risque ? tab.lb_risque : "";
        this.famille_produit = tab.code_famille ? tab.code_famille : "";
        this.lb_famille_produit = tab.lb_famille ? tab.lb_famille : "";
        this.produit = tab.code_produit ? tab.code_produit : "";
        this.lb_produit = tab.lb_produit ? tab.lb_produit : "";
        this.date_annulation = tab.date_annulation&&tab.date_annulation.length>7 ? tab.date_annulation.substr(0,4)+"-"+tab.date_annulation.substr(4,2)+"-"+tab.date_annulation.substr(6,2) : "";
        this.reference_client = tab.reference_client ? tab.reference_client : "";
        this.statut = tab.statut ? tab.statut : "";
    }


}