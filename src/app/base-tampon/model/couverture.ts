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
        this.debut_effet = tab.debut_effet ? tab.debut_effet : "";
        this.fin_effet = tab.fin_effet ? tab.fin_effet : "";
        this.id_societe = tab.id_societe ? tab.id_societe : "";
        this.raison_sociale = tab.raison_sociale ? tab.raison_sociale : "";
        this.code_option = tab.code_option ? tab.code_option : "";
        this.lb_option = tab.lb_option ? tab.lb_option : "";
        this.risque = tab.risque ? tab.risque : "";
        this.lb_risque = tab.lb_risque ? tab.lb_risque : "";
        this.famille_produit = tab.famille ? tab.famille : "";
        this.lb_famille_produit = tab.lb_famille_produit ? tab.lb_famille_produit : "";
        this.produit = tab.produit ? tab.produit : "";
        this.lb_produit = tab.lb_produit ? tab.lb_produit : "";
        this.date_annulation = tab.date_annulation ? tab.date_annulation : "";
        this.reference_client = tab.ref_client ? tab.ref_client : "";
        this.statut = tab.statut ? tab.statut : "";
    }


}