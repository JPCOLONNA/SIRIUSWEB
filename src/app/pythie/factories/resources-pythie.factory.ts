import { ResourcesPythieService } from '../providers/resources-pythie.service';

export function ResourcesPythieFactory (rsc: ResourcesPythieService) {
    return () => rsc.load();
}
