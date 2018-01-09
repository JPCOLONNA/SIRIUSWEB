import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Broadcaster } from './broadcaster';

/**
 * Service qui sauvegarde et restitue le contenu du menu<br />
 * Transfert le contenu d'un menu d'un composant à un autre sans avoir de lien de parenté
 */
@Injectable()
export class MenuEvent {
  constructor(private broadcaster: Broadcaster) {}

  /**
   * Sauvegarde le contenu du menu 
   * @param inputName Contenu du menu sous forme de json converti string
   */
  fire(inputName:string): void {
    this.broadcaster.broadcast(MenuEvent, inputName);
  }

  /**
   * Restitue le contenu du menu sous forme de string à convertir en json
   * @returns Retourne un observable contenant le menu au format json
   */
  on(): Observable<string> {
    return this.broadcaster.on<string>(MenuEvent);
  }
}
