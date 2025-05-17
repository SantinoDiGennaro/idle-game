import {DestroyRef, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceConfig} from '../../models/types/resource-config.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject, map} from 'rxjs';
import {Structure} from '../../models/types/structure.type';

@Injectable({
  providedIn: 'root',
})
export class ConfigGetterService {

  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #baseUrl = 'assets/configuration/';
  resourceConfig: BehaviorSubject<ResourceConfig | null> = new BehaviorSubject<ResourceConfig | null>(null);
  structureConfig: BehaviorSubject<Array<Structure>> = new BehaviorSubject<Array<Structure>>([]);

  constructor() {
    this.getResourceConfig();
    this.getStructureConfig();
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



}
