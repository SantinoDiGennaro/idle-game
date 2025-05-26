import {DestroyRef, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceConfig} from '../../models/types/resource-config.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject, map} from 'rxjs';
import {Structure} from '../../models/types/structure.type';
import {Info} from '../../models/types/info.type';
import {SavedData} from '../../models/types/saved-data.type';

@Injectable({
  providedIn: 'root',
})
export class ConfigGetterService {

  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #baseUrl = 'assets/configuration/';
  resourceConfig: BehaviorSubject<ResourceConfig | null> = new BehaviorSubject<ResourceConfig | null>(null);
  structureConfig: BehaviorSubject<Array<Structure>> = new BehaviorSubject<Array<Structure>>([]);
  infoConfig: BehaviorSubject<Info | null> = new BehaviorSubject<Info | null>(null);

  constructor() {
    if(!this.loadData()){
      this.getResourceConfig();
      this.getStructureConfig();
    }
    this.getInfoConfig();
    this.autoSave();
  }

  getResourceConfig(): void {
    this.#httpClient.get<ResourceConfig>(`${this.#baseUrl}resources.config.json`)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        map((res: any) => { return res.resources })
      )
      .subscribe({
        next: (config: ResourceConfig) => {
          this.resourceConfig.next(config);
        }
      });
  }

  getStructureConfig(): void {
    this.#httpClient.get<Array<Structure>>(`${this.#baseUrl}structures.config.json`)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        map((res: any) => { return res.structures })
      )
      .subscribe({
        next: (config: Array<Structure>) => {
          this.structureConfig.next(config);
        }
      });
  }

  getInfoConfig(): void {
    this.#httpClient.get<Info>(`${this.#baseUrl}info.config.json`)
      .pipe(
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: (config: Info) => {
          this.infoConfig.next(config);
        }
      });
  }

  saveData(): void {
    const savedData: SavedData = {
      resources: this.resourceConfig.getValue()!,
      structures: this.structureConfig.getValue(),
      timestamp: Date.now(),
    };

    localStorage.setItem('idle-game', JSON.stringify(savedData));
  }

  autoSave(): void {
    setInterval(()=>{
      this.saveData();
    }, 60000);
  }

  loadData(): boolean {
    const savedDataString = localStorage.getItem('idle-game');

    if (savedDataString) {
      const savedData: SavedData = JSON.parse(savedDataString);
      const now = Date.now();
      const diffTime = now - savedData.timestamp ;
      savedData.resources.primaryResource.amount += diffTime * savedData.resources.primaryResource.perSecond!;
      this.resourceConfig.next(savedData.resources);
      this.structureConfig.next(savedData.structures);
      return true;
    } else {
      return false;
    }

  }

}
