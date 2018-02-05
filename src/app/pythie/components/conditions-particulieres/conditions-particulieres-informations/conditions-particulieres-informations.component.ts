import { Component, OnInit, Input }       from '@angular/core';
import { MatDialog }                      from '@angular/material';
import { ActivatedRoute }                 from '@angular/router';
import { ModalListePiecesComponent }      from '../../../../commun/components/modal-liste-pieces/modal-liste-pieces.component';
import { ResourcesService }               from '../../../../core/providers/resources.service';
import { ModalListesStructureComponent }  from '../../modal-listes-structure/modal-listes-structure.component';
/**
 * Informations générales d'une branche "Conditions Particulières (CP)"
 */
@Component({
  selector: 'app-conditions-particulieres-informations',
  templateUrl: './conditions-particulieres-informations.component.html',
  styleUrls: ['./conditions-particulieres-informations.component.scss']
})
export class ConditionsParticulieresInformationsComponent implements OnInit {
  /** Ressources globales : label commun à toutes les applications<br /> Fichier : resources/_resources.json */
  rsc:any;

  /** Identifiant assuré */
  @Input() idAssure?: number;
  /** Action sur l'écran<br />Valeur : valeur: consulter(par défaut), modifier, ajouter */
  @Input() action?: string;
  /** Données de la branche CP en cour d'affichage, dans le cas d'une consultation et d'une modification */
  @Input() brancheCP?: any; 

  /**
   * Créer une instance du composant ConditionsParticulieresInformationsComponent<br />
   * @param dialog           Pour initier une modale
   * @param activatedRoute   Route active (url du navigateur)
   * @param resourcesService Services de ressources pour toute les applications
   */
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private resourcesService:ResourcesService) { }

  /**
   * Initialise le composant et de ses variables<br/>
   * Récupère les ressources
   * Initialise l'action à l'écran si pas renseigné à "consulter"
   */
  ngOnInit() {
    //Ressources
    this.rsc = this.resourcesService.get();

    //Par défaut, l'accès à l'écran est en mode "consultation"
    if(this.action == null)
      this.action='consulter';
  }

  /**
   * Affichage de la modale contenant le détail d'une liste de pièces
   * @param idListePieces : Identifiant de la liste de pièces à afficher
   */
  displayModalListPieces(idListePieces: number)
  {
    //Chargement de la modal, la taille varie selon le contenu.
    let dialogRef = this.dialog.open(ModalListePiecesComponent, {
      minWidth:"70%",
      data: { 
        idListePieces: idListePieces, 
        route: this.activatedRoute,
      },
      autoFocus: false 
    });
  }

  /**
   * Affichage de la modale contenant le détail d'une liste structure
   * @param idListeStructure Identifiant de la liste structure à afficher
   */
  afficheModalListeStructure(idListeStructure: number)
  {
    //Chargement de la modal, la taille varie selon le contenu.
    //En paramètre : identifiant de la liste structure à afficher et l'url du navigateur
    let dialogRef = this.dialog.open(ModalListesStructureComponent, {
      minWidth:"80%",
      data: { 
        idListeStructure: idListeStructure, 
        route: this.activatedRoute,
      },
      autoFocus: false 
    });
  }

}
