export class Societe {

    id_societe: string;
    raison_sociale: string;
    adresse: string;
    adresse_suite: string;
    code_postal: string;
    ville: string;
    siren: string;

    constructor(element: any) {
        this.id_societe = element.id ? element.id : "";
        this.raison_sociale = element.raison_sociale ? element.raison_sociale : "";
        this.adresse = element.adresse1 ? element.adresse1 : "";
        this.adresse_suite = element.adresse2 ? element.adresse2 : "";
        this.code_postal = element.code_postal ? element.code_postal : "";
        this.ville = element.ville ? element.ville : "";
        this.siren = element.num_siren ? element.num_siren : "";
    }
}