import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Broadcaster } from './broadcaster';

/**
 * Service qui sauvegarde et restitue les informations de l'applications en cours d'utilisation<br />
 * Transfert les informations de l'applications en cours d'utilisation d'un composant à un autre sans avoir de lien de parenté
 */
@Injectable()
export class ApplicationInfoEvent {
  constructor(private broadcaster: Broadcaster) {}

  /**
   * Sauvegarde les informations de l'applications en cours d'utilisation 
   * @param inputName Les informations de l'applications en cours d'utilisation sous forme de json converti string
   */
  fire(inputName:string): void {
    this.broadcaster.broadcast(ApplicationInfoEvent, inputName);
  }

  /**
   * Restitue les informations de l'applications en cours d'utilisation sous forme de string à convertir en json
   * @returns Retourne un observable contenant les informations de l'applications en cours d'utilisation au format json
   */
  on(): Observable<string> {
    return this.broadcaster.on<string>(ApplicationInfoEvent);
  }
}
