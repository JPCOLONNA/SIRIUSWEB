import { ResourcesService } from '../providers/resources.service';

/**
 * Déclenche le chargement en mémoire des ressources générales de toutes les applications
 * @param rsc   Ressources récupérées du service ResourcesService
 */
export function ResourcesFactory (rsc: ResourcesService) {
    return () => rsc.load();
}
