import { ResourcesAssuresService } from '../providers/resources-assures.service';
/**
 * Déclenche le chargement en mémoire des ressources de l'application "ASSURES"
 * @param rsc   Ressources récupérées du service ResourcesAssuresService
 */
export function ResourcesAssuresFactory (rsc: ResourcesAssuresService) {
    return () => rsc.load();
}
