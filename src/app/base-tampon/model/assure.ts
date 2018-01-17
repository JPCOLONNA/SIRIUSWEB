export class Assure {
    id_evenement: string;
    id_assure: string;
    id_beneficiaire: string;
    civilite: string;
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
    transfert_noemie: string;
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


    constructor(tab: any) {
        this.id_evenement = tab.id_evenement ? tab.id_evenement : "";
        this.id_assure = tab.id_assure ? tab.id_assure : "";
        this.civilite = tab.civilite ? tab.civilite : "";
        this.nom = tab.nom_assure ? tab.nom_assure : "";
        this.prenom = tab.prenom_assure ? tab.prenom_assure : "";
        if (tab.nom_beneficiaire || tab.prenom_beneficiaire) {
            this.nom = tab.nom_beneficiaire ? tab.nom_beneficiaire : "";
            this.prenom = tab.prenom_beneficiaire ? tab.prenom_beneficiaire : "";
        }
        this.adresse = tab.adresse ? tab.adresse : "";
        this.adresse_suite = tab.adresse_suite ? tab.adresse_suite : "";
        this.code_postal = tab.code_postal ? tab.code_postal : "";
        this.ville = tab.ville ? tab.ville : "";
        this.telephone_fixe = tab.telephone_fixe ? tab.telephone_fixe : "";
        this.telephone_mobile = tab.telephone_mobile ? tab.telephone_mobile : "";
        this.email = tab.email ? tab.email : "";
        this.date_naissance = tab.date_naissance ? tab.date_naissance : "";
        this.situation_familiale = tab.situation_familiale ? tab.situation_familiale : "";
        this.lb_situation_familiale = tab.lb_situation_familiale ? tab.lb_situation_familiale : "";
        this.nombre_enfant = tab.nombre_enfant ? tab.nombre_enfant : "";
        this.transfert_noemie = tab.transfert_noemie ? tab.transfert_noemie : "";
        this.regime_caisse = tab.regime_caisse ? tab.regime_caisse : "";
        this.caisse = tab.caisse ? tab.caisse : "";
        this.guichet_caisse = tab.guichet_caisse ? tab.guichet_caisse : "";
        this.cle_caisse = tab.cle_caisse ? tab.cle_caisse : "";
        this.numero_ss = tab.numero_ss ? tab.numero_ss : "";
        this.cle_ss = tab.cle_ss ? tab.cle_ss : "";
        this.mtt_cotisation = tab.mtt_cotisation ? tab.mtt_cotisation : "";
        this.qualite = tab.qualite ? tab.qualite : "";
        this.lb_qualite = tab.lb_qualite ? tab.lb_qualite : "";
        this.rang = tab.rang ? tab.rang : "";
        this.attachement = tab.attachement ? tab.attachement : "";
        this.lb_attachement = tab.lb_attachement ? tab.lb_attachement : "";
        this.debut_effet = tab.debut_effet ? tab.debut_effet : "";
        this.fin_effet = tab.fin_effet ? tab.fin_effet : "";

        
    }

}