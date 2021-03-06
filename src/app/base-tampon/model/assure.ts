export class Assure {
    num: number;
    id_evenement: string;
    id_assure: string;
    id_beneficiaire: string;
    civilite: string;
    lb_civilite: string;
    nom: string;
    prenom: string;
    adresse: string;
    adresse_suite: string;
    code_postal: string;
    ville: string;
    telephone_fixe: string;
    telephone_mobile: string;
    email: string;
    date_naissance: string;
    situation_familiale: string;
    lb_situation_familiale: string;
    nombre_enfant: string;
    transfert_noemie: boolean;
    regime_caisse: string;
    caisse: string;
    guichet_caisse: string;
    cle_caisse: string;
    numero_ss: string;
    cle_ss: string;
    mtt_cotisation: string;
    qualite: String;
    lb_qualite: string;
    rang: string;
    attachement: string;
    lb_attachement: string;
    debut_effet: string;
    fin_effet: string;


    constructor(tab: any, numero: number) {
        this.num=numero;
        this.id_evenement = tab.id_evenement ? tab.id_evenement : "";
        this.id_assure = tab.id_assure ? tab.id_assure : "";
        this.id_beneficiaire = tab.id_benef ? tab.id_benef : "";
        this.civilite = tab.civilite ? tab.civilite : "";
        this.lb_civilite = tab.lb_civilite ? tab.lb_civilite : "";
        this.nom = tab.nom_assure ? tab.nom_assure : "";
        this.prenom = tab.prenom_assure ? tab.prenom_assure : "";
        if (tab.nom_benef || tab.prenom_benef) {
            this.nom = tab.nom_benef ? tab.nom_benef : "";
            this.prenom = tab.prenom_benef ? tab.prenom_benef : "";
        }
        this.adresse = tab.adresse ? tab.adresse : "";
        this.adresse_suite = tab.adresse_suite ? tab.adresse_suite : "";
        this.code_postal = tab.code_postal ? tab.code_postal : "";
        this.ville = tab.ville ? tab.ville : "";
        this.telephone_fixe = tab.telephone_fixe ? tab.telephone_fixe : "";
        this.telephone_mobile = tab.telephone_mobile ? tab.telephone_mobile : "";
        this.email = tab.email ? tab.email : "";
        this.date_naissance = tab.date_naissance&&tab.date_naissance>7 ? tab.date_naissance.substr(0,4)+"-"+tab.date_naissance.substr(4,2)+"-"+tab.date_naissance.substr(6,2) : "";
        this.situation_familiale = tab.situation_familiale ? tab.situation_familiale : "";
        this.lb_situation_familiale = tab.lb_situation_familiale ? tab.lb_situation_familiale : "";
        this.nombre_enfant = tab.nombre_enfant ? tab.nombre_enfant : "";
        this.transfert_noemie = tab.transfert_noemie==='1' ? true : false;
        this.regime_caisse = tab.regime_caisse&&tab.regime_caisse.length===2 ? tab.regime_caisse :  tab.regime_caisse&&tab.regime_caisse.length===1 ? "0"+tab.regime_caisse : "";
        this.caisse = tab.caisse ? tab.caisse : "";
        this.guichet_caisse = tab.guichet_caisse ? tab.guichet_caisse : "";
        this.cle_caisse = tab.cle_caisse ? tab.cle_caisse : "";
        this.numero_ss = tab.numero_ss ? tab.numero_ss : "";
        this.cle_ss = tab.cle_ss ? tab.cle_ss : "";
        this.mtt_cotisation = tab.mtt_cotisation ? tab.mtt_cotisation : "";
        this.qualite = tab.qualite_benef ? tab.qualite_benef : "";
        this.lb_qualite = tab.lb_qualite_benef ? tab.lb_qualite_benef : "";
        this.rang = tab.rang_benef ? tab.rang_benef : "";
        this.attachement = tab.rattachement ? tab.rattachement : "";
        this.lb_attachement = tab.lb_rattachement ? tab.lb_rattachement : "";
        this.debut_effet = tab.debut_effet&&tab.debut_effet>7 ? tab.debut_effet.substr(0,4)+"-"+tab.debut_effet.substr(4,2)+"-"+tab.debut_effet.substr(6,2) : "";
        this.fin_effet = tab.fin_effet&&tab.fin_effet>7 ? tab.fin_effet.substr(0,4)+"-"+tab.fin_effet.substr(4,2)+"-"+tab.fin_effet.substr(6,2) : "";

    }


}