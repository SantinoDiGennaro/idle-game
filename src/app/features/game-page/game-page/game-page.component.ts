import {Component, DestroyRef, inject} from '@angular/core';
import {ConfigGetterService} from '../../../providers/services/config-getter.service';
import {ResourceConfig} from '../../../models/types/resource-config.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';
import {Structure} from '../../../models/types/structure.type';

@Component({
  selector: 'app-game-page',
  standalone: false,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent {
  readonly #configService = inject(ConfigGetterService);
  readonly multiplyResource = 1.15;
  resources!: ResourceConfig;
  structures: Array<Structure> = [];

  constructor() {
    this.#configService
      .resourceConfig
      .pipe(
        takeUntilDestroyed(),
        filter(resource => !!resource)
      )
      .subscribe({
        next: (res) => {
          this.resources = res;
        }
      });

    this.#configService
      .structureConfig
      .pipe(
        takeUntilDestroyed(),
        filter(resource => !!resource)
      )
      .subscribe({
        next: (res) => {
          this.structures = res;
        }
      });

    this.rescourcesOnTime();
  }

  increaseResources(): void {
    this.resources.primaryResource.amount += this.resources.primaryResource.perClick ?? 0;
  }

  purchaseStructure(structureId: string): void {
    this.structures.forEach(structure => {
      if (structure.id === structureId) {
        if (this.resources.primaryResource.amount > structure.costPrimary) {
          this.resources.primaryResource.perSecond! += structure.productionBoost;
          this.resources.secondaryResource.amount += structure.productionSecondaryBoost ?? 0;
          this.resources.primaryResource.amount -= structure.costPrimary;
          structure.costPrimary *= this.multiplyResource;
        } else {
          console.log('risorsa insufficiente')
        }
      }
    })
  }

  private rescourcesOnTime(): void {
    setInterval(() => {
      this.resources.primaryResource.amount += this.resources.primaryResource.perSecond ?? 0;
      this.#configService.structureConfig.next(this.structures);
      this.#configService.resourceConfig.next(this.resources);
    }, 1000)
  }
}
