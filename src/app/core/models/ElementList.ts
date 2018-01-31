/**
 * Modèle d'un élément d'une liste générale
 */
export class ElementList {

    /** Code d'une valeur d'une liste */
    code: string;
    /** Libellé d'une valeur d'une liste */
    libelle: string;

    /**
     * Crée une instance d'ElementList
     * @param element   Valeurs de l'élément
     */
    constructor(element:any) {
        this.code = element.code ? element.code : '';
        this.libelle = element.libelle ? element.libelle : '';
     }
}