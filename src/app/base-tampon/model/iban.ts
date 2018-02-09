export class Iban {
    num: number;
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
    imputation_frais: boolean;
    complement_info;

    listeIbans: Array<Iban>;

    constructor(tab: any, numero: number) {
        this.num = numero;
        this.id_titulaire= tab.id_titulaire ? tab.id_titulaire : "";
        this.type_titulaire= tab.type_titul ? tab.type_titul : "";
        this.nom_titulaire= tab.nom_titul ? tab.nom_titul : "";
        this.prenom_titulaire= tab.prenom_titulaire ? tab.prenom_titulaire : "";
        this.statut= tab.statut_rib ? tab.statut_rib : "";
        this.nature= tab.nature_rib ? tab.nature_rib : "";
        this.debut_validite= tab.debut_validite&&tab.debut_validite.length>7 ? tab.debut_validite.substr(0,4)+"-"+tab.debut_validite.substr(4,2)+"-"+tab.debut_validite.substr(6,2) : "";
        this.fin_validite= tab.fin_validite&&tab.fin_validite.length>7 ? tab.fin_validite.substr(0,4)+"-"+tab.fin_validite.substr(4,2)+"-"+tab.fin_validite.substr(6,2) : "";
        this.nom= tab.beneficiaire ? tab.beneficiaire : "";
        this.domiciliation_banque= tab.domiciliation ? tab.domiciliation : "";
        this.domiciliation_adresse= tab.adr_domi ? tab.adr_domi : "";
        this.domiciliation_code_postal= tab.cp_domi ? tab.cp_domi : "";
        this.domiciliation_ville= tab.ville_domi ? tab.ville_domi : "";
        this.domiciliation_pays= tab.pays_domi ? tab.pays_domi : "";
        this.code_bic= tab.code_bic ? tab.code_bic : "";
        this.iban_code_pays= tab.pays_iban ? tab.pays_iban : "";
        this.iban_cle= tab.cle_iban ? tab.cle_iban : "";
        this.iban_code= tab.code_iban ? tab.code_iban : "";
        this.devise= tab.devise ? tab.devise : "";
        this.imputation_frais= tab.imputation_frais==="1" ? true: false;
        this.complement_info= tab.complement_info ? tab.complement_info : "";
    }

    /*remplirChamp(tab: any, champs: string) {
        this[champs] = tab[champs] ? tab[champs] : "";
    }*/
}