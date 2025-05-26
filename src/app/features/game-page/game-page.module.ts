import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GamePageRoutingModule} from './game-page-routing.module';
import { GamePageComponent } from './game-page/game-page.component';
import {ConfigGetterService} from '../../providers/services/config-getter.service';
import {provideHttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    MatButtonModule,
  ],
  providers: [
    ConfigGetterService,
    provideHttpClient()
  ]
})
export class GamePageModule { }
