import {Component, inject} from '@angular/core';
import {ConfigGetterService} from './providers/services/config-getter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'idle-game';
  #configService = inject(ConfigGetterService);

  save(){
    this.#configService.saveData();
  }
}
