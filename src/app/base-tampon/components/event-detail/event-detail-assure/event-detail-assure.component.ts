import { Component, OnInit, Input } from '@angular/core';
import { ResourcesService } from 'app/core/providers/resources.service';

import { Assure } from '../../../model/assure';
import { Couverture } from '../../../model/couverture';
import { Iban } from '../../../model/iban';
import { Salarie } from '../../../model/salarie';

/**
 * Liste les assurés de la base tampon pour un évènement
 */
@Component({
  selector: 'app-event-detail-assure',
  templateUrl: './event-detail-assure.component.html',
  styleUrls: ['./event-detail-assure.component.scss']
})
export class EventDetailAssureComponent implements OnInit {

  /** Ressources générales */
  rsc: any;

  /** Action effectuée sur l'écran : consulter ou modifier */
  @Input() action: string;

  /** Liste des assurés à afficher */
  @Input() listAssures: Array<any>;

  /** Liste des bénéficiaires à afficher */
  @Input() listBeneficiaires: Array<any>;

  /** Liste des couvertures à afficher */
  @Input() listCouvertures: Array<any>;

  /** Liste des couvertures bénéficiaires à afficher */
  @Input() listCouverturesBeneficiaires: Array<any>;

  /** Liste des infos salariés à afficher */
  @Input() listInfosSalaries: Array<any>;

  /** Liste des infos salariés à afficher */
  @Input() listInfosIban: Array<any>;

  /**
   * Créer une instance du composant EventDetailAssureComponent<br />
   * @param resourcesService                Services de ressources pour toute les applications
   */
  constructor(private resourcesService: ResourcesService) {


  }

  /**
  * Initialise le composant et de ses variables<br/>
  */
  ngOnInit() {
    this.rsc = this.resourcesService.get();
  }

}
