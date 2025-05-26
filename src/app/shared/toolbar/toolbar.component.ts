import {Component, DestroyRef, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ConfigGetterService} from '../../providers/services/config-getter.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Info} from '../../models/types/info.type';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  readonly #configService =inject(ConfigGetterService);
  readonly #destroyRef =inject(DestroyRef);
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  info: Info | null = null;

  ngOnInit() {
    this.#configService.infoConfig
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (info) => {
          this.info = info;
        }
      });
  }

}
