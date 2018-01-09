import { SettingsService } from '../providers/settings.service';

/**
 * Déclenche le chargement en mémoire de la configuration générale de toutes les applications
 * @param rsc   Ressources récupérées du service SettingsService
 */
export function SettingsFactory (config: SettingsService) {
    return () => config.load();
}
