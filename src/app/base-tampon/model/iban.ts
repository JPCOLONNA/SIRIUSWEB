export class Iban {

    id_evenement: string;
    id_titulaire: string;
    type_titulaire: string;
    nom_titulaire: string;
    prenom_titulaire: string;
    statut: string;
    nature: string;
    debut_validite: string;
    fin_validite: string;
    nom: string;
    domiciliation_banque: string;
    domiciliation_adresse: string;
    domiciliation_code_postal: string;
    domiciliation_ville: string;
    domiciliation_pays: string;
    code_bic: string;
    iban_code_pays: string;
    iban_cle: string;
    iban_code: string;
    devise: string;
    imputation_frais: string;
    complement_info;

    listeIbans: Array<Iban>;

    constructor(tab: any) {
        this.id_titulaire= tab.id_titulaire ? tab.id_titulaire : "";
        this.type_titulaire= tab.type_titulaire ? tab.type_titulaire : "";
        this.nom_titulaire= tab.nom_titulaire ? tab.nom_titulaire : "";
        this.prenom_titulaire= tab.prenom_titulaire ? tab.prenom_titulaire : "";
        this.statut= tab.statut ? tab.statut : "";
        this.nature= tab.nature ? tab.nature : "";
        this.debut_validite= tab.debut_validite ? tab.debut_validite : "";
        this.fin_validite= tab.fin_validite ? tab.fin_validite : "";
        this.nom= tab.nom ? tab.nom : "";
        this.domiciliation_banque= tab.domiciliation_banque ? tab.domiciliation_banque : "";
        this.domiciliation_adresse= tab.domiciliation_adresse ? tab.domiciliation_adresse : "";
        this.domiciliation_code_postal= tab.domiciliation_code_postal ? tab.domiciliation_code_postal : "";
        this.domiciliation_ville= tab.domiciliation_ville ? tab.domiciliation_ville : "";
        this.domiciliation_pays= tab.domiciliation_pays ? tab.domiciliation_pays : "";
        this.code_bic= tab.code_bic ? tab.code_bic : "";
        this.iban_code_pays= tab.iban_code_pays ? tab.iban_code_pays : "";
        this.iban_cle= tab.iban_cle ? tab.iban_cle : "";
        this.iban_code= tab.iban_code ? tab.iban_code : "";
        this.devise= tab.devise ? tab.devise : "";
        this.imputation_frais= tab.imputation_frais ? tab.imputation_frais : "";
        this.complement_info= tab.complement_info ? tab.complement_info : "";
    }

    /*remplirChamp(tab: any, champs: string) {
        this[champs] = tab[champs] ? tab[champs] : "";
    }*/
}