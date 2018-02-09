export class Evenement {
    num: number;
    id_evenement: string;
    id_stockage: string;
    type_action: string;
    id_assure: string;
    nom_assure: string;
    prenom_assure: string;
    id_societe: string;
    raison_sociale: string;
    date_traitement: string;
    heure_traitement: string;
    provenance: string;
    statut: string;

    listeEvenements: Array<Evenement>;

    constructor(tab: any, numero: number) {
        this.num = numero;
        this.id_evenement = tab.id_evenement ? tab.id_evenement : "";
        this.id_stockage = tab.id_stockage ? tab.id_stockage : "";
        this.type_action = tab.type_action ? tab.type_action : "";
        this.id_assure = tab.id_assure ? tab.id_assure : "";
        this.nom_assure = tab.nom_assure ? tab.nom_assure : "";
        this.prenom_assure = tab.prenom_assure ? tab.prenom_assure : "";
        this.id_societe = tab.id_societe ? tab.id_societe : "";
        this.raison_sociale = tab.raison_sociale ? tab.raison_sociale : "";
        this.date_traitement = tab.date_traitement ? tab.date_traitement : "";
        this.heure_traitement = tab.heure_traitement ? tab.heure_traitement : "";
        this.provenance = tab.provenance ? tab.provenance : "";
        this.statut = tab.statut ? tab.statut : "";
    }

}