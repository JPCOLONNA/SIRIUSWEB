import { ResourcesBaseTamponService } from '../providers/resources-base-tampon.service';
/**
 * Déclenche le chargement en mémoire des ressources de l'application "BASE TAMPON"
 * @param rsc   Ressources récupérées du service ResourcesBaseTamponService
 */
export function ResourcesBaseTamponFactory (rsc: ResourcesBaseTamponService) {
    return () => rsc.load();
}
