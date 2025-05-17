import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GamePageRoutingModule} from './game-page-routing.module';
import { GamePageComponent } from './game-page/game-page.component';
import {ConfigGetterService} from '../../providers/services/config-getter.service';
import {provideHttpClient} from '@angular/common/http';



@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
  ],
  providers: [
    ConfigGetterService,
    provideHttpClient()
  ]
})
export class GamePageModule { }
