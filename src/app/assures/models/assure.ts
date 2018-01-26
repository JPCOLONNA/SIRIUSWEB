export class Assure {
    id_assure: string;
    civilite: string;
    nom: string;
    prenom: string;
    adresse: string;
    adresse_suite: string;
    code_postal: string;
    ville: string;
    date_naissance: string;
    num_ss: string


    constructor(element: any) {
        this.id_assure = element.id_assure ? element.id_assure : "";
        this.civilite = element.civilite ? element.civilite : "";
        this.nom = element.nom ? element.nom : "";
        this.prenom = element.prenom ? element.prenom : "";
        this.adresse = element.adresse1 ? element.adresse1 : "";
        this.adresse_suite = element.adresse2 ? element.adresse2 : "";
        this.code_postal = element.code_postal ? element.code_postal : "";
        this.ville = element.ville ? element.ville : "";
        this.date_naissance = element.date_naissance ? element.date_naissance : "";
        this.num_ss = element.num_ss ? element.num_ss : "";
    }

}