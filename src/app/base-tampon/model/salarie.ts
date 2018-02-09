export class Salarie { 
    num: number;
    id_evenement: string;
    id_societe: string;
    raison_sociale: string;
    code_societe: string;
    id_assure: string;
    nom: string;
    prenom: string;
    debut_contrat: string;
    fin_contrat: string;
    statut_professionnel: string;
    lb_statut_prof: string;
    contrat_travail: string;
    lb_contrat_travail: string;
    motif_depart: string;
    lb_motif_depart: string;
    top_refus: boolean;
    niveau_professionnel: string;
    lb_niveau_professionnel: string;
    echelon: string;
    lb_echelon: string;
    categorie_socio_professionnelle: string;
    lb_categorie_socio_professionnelle: string;
    temps_de_travail: string;
    lb_temps_de_travail: string;
    code_salarie: string;


    constructor(tab: any, numero: number) {
        this.num=numero;
        this.id_evenement = tab.id_evenement ? tab.id_evenement : "";
        this.code_societe = tab.id_societe ? tab.id_societe : "";
        this.raison_sociale = tab.raison_sociale ? tab.raison_sociale : "";
        this.id_assure = tab.id_salarie ? tab.id_salarie : "";
        this.nom = tab.nom_salarie ? tab.nom_salarie : "";
        this.prenom = tab.prenom_salarie ? tab.prenom_salarie : "";
        this.debut_contrat = tab.debut_contrat&&tab.debut_contrat>7 ? tab.debut_contrat.substr(0,4)+"-"+tab.debut_contrat.substr(4,2)+"-"+tab.debut_contrat.substr(6,2) : "";
        this.fin_contrat = tab.fin_contrat&&tab.fin_contrat>7 ? tab.fin_contrat.substr(0,4)+"-"+tab.fin_contrat.substr(4,2)+"-"+tab.fin_contrat.substr(6,2) : "";
        this.statut_professionnel = tab.statut_prof ? tab.statut_prof : "";
        this.lb_statut_prof = tab.lb_statut_prof ? tab.lb_statut_prof : "";
        this.contrat_travail = tab.w_contrat_travail ? tab.w_contrat_travail : "";
        this.lb_contrat_travail = tab.lb_contrat_travail? tab.lb_contrat_travail : "";
        this.motif_depart = tab.motif_depart ? tab.motif_depart : "";
        this.lb_motif_depart = tab.lb_motif_depart ? tab.lb_motif_depart : "";
        this.top_refus = tab.refus_portabilite==="1" ? true: false;
        this.niveau_professionnel = tab.niveau_professionnel ? tab.niveau_professionnel : "";
        this.lb_niveau_professionnel = tab.lb_niveau_professionnel ? tab.lb_niveau_professionnel : "";
        this.echelon = tab.echelon ? tab.echelon : "";
        this.lb_echelon = tab.lb_echelon ? tab.lb_echelon : "";
        this.categorie_socio_professionnelle = tab.categorie_socio_professionnelle ? tab.categorie_socio_professionnelle : "";
        this.lb_categorie_socio_professionnelle = tab.lb_categorie_socio_professionnelle ? tab.lb_categorie_socio_professionnelle : "";
        this.temps_de_travail = tab.temps_de_travail ? tab.temps_de_travail : "";
        this.lb_temps_de_travail = tab.lb_temps_de_travail ? tab.lb_temps_de_travail : "";
        this.code_salarie = tab.code_salarie ? tab.code_salarie : "";
    }
}