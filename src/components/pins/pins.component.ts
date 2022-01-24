import { Component, OnInit } from '@angular/core';
import { CalculateScoreService } from '../../services/calculate-score.service';


@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {

  pinCountArray: Array<number> = [];
  roll: number = 1;
  frameCount: number = 1;
  knockedPins: number = 0;
  tenthFrameCount: number = 0;
  istenthFrameStrike: boolean = false;
  isDisablePins: boolean = false;

  constructor(private calcScoreService: CalculateScoreService) { }

  ngOnInit(): void {
    this.generatePinArray(10);
  }

  /* generates pinArray for initial rendering of pin buttons */
  generatePinArray(pinCount: number): void {
    this.pinCountArray = Array.from({ length: pinCount + 1 }, (_, index) => index);
  }

/* 
- called when pin is knocked
- updates the pinCount for the DOM to render accordingly
*/
  knockPin(knockedPins: number): void {
    this.knockedPins = knockedPins;
    let pinCount = 10;
    let roll = 1;
    if (this.frameCount !== 10) {
      this.calcScoreService.calculateScore([knockedPins, this.frameCount, this.roll]);
      if (this.roll == 1 && this.knockedPins != 10) {
        pinCount = 10 - knockedPins;
        roll = 2;
      }
      else
        this.frameCount += 1
      this.roll = roll;
      this.generatePinArray(pinCount);
    }
    else
      this.tenthFrameScenario(knockedPins);
  }

  /* 
  - checks for the tenth frame special case
  - disables the pins if max rolls are reached
  */
  tenthFrameScenario(knockedPins: number):void {
    let pinCount = 10;
    let disablePins = false;
    this.roll == 1 && knockedPins == 10 ? this.istenthFrameStrike = true : null;
    this.calcScoreService.calculateScore([knockedPins, 10, this.roll]);
    this.tenthFrameCount += knockedPins;
    if (this.roll == 3)
      disablePins = true;
    if ((this.roll == 2 && !(this.istenthFrameStrike || knockedPins == 10 || this.tenthFrameCount == 10)))
      disablePins = true;
    this.isDisablePins = disablePins;
    this.roll += 1;
    pinCount = (this.roll == 2 && this.tenthFrameCount < 10) ? 10 - knockedPins : 10;
    this.generatePinArray(pinCount);
  }
}

