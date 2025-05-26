import {ResourceConfig} from './resource-config.type';
import {Structure} from './structure.type';

export type SavedData = {
  resources: ResourceConfig,
  structures: Array<Structure>,
  timestamp: number
}
