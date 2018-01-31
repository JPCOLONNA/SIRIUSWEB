export class Plan {
    id_plan: string;
    type_plan: string;
    type_plan_desc: string;
    nom: string;
    description: string;
    date_debut: string;
    date_fin: string;
    actif: string;
    
    constructor(element: any) {
        this.id_plan = element.id ? element.id : "";
        this.nom = element.nom ? element.nom : "";
        this.description = element.description ? element.description : "";
        this.type_plan = element.type_plan ? element.type_plan : "";
        this.type_plan_desc = element.type_plan_desc ? element.type_plan_desc : "";
        this.date_debut = element.date_debut ? element.date_debut : "";
        this.date_fin = element.date_fin ? element.date_fin : "";
        this.actif = element.actif ? element.actif : "";
    }

}