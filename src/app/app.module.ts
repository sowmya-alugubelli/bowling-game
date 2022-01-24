import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PinsComponent } from '../components/pins/pins.component';
import { ScoreBoardComponent } from '../components/score-board/score-board.component';

@NgModule({
  declarations: [
    AppComponent,
    PinsComponent,
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

