import { Component, OnInit } from '@angular/core';
import { CalculateScoreService } from '../../services/calculate-score.service';



@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private calcScoreService: CalculateScoreService) { }
  score: number = 0;
  totalScore: number = 0;
  frame: number = 1;
  roll: number = 1;
  scoreBoardData: Array<Array<number>> = [];

  /* generates score board data for initial empty table rendering */
  ngOnInit(): void {
    let boardArray = [];
    for (let i = 0; i <= 8; i++) {
      boardArray.push([-1, -1]);
    }
    this.scoreBoardData = [...boardArray, [-1, -1, -1]];
    this.getScore();
  }


/* get score from pin component(when cliked on pin) via service */
  getScore() {
    this.calcScoreService.scoreData.subscribe((data: Array<number>) => {
      this.score = data[0];
      if (data[2] !== 0) this.calcTotalScore(data[0], data[1] - 1, data[2]);
    })
  }

/* updates scoreBoradData and calculates total score on receiving new score */
  calcTotalScore(score: number, frame: number, roll: number) {
    this.roll=roll;
    this.scoreBoardData[frame][roll - 1] = score;
    if (!this.checkForLastScenario(score, frame, roll))
      this.totalScore += score;
    this.checkForStrike(frame, score, roll);
    if (this.roll == 1) {
      this.checkForSpare(frame, score);
    }
  }

  /* This is the check for last frame roll2, roll3 scenario */
  checkForLastScenario(score: number, frame: number, roll: number) {
    return (frame == 9 && this.scoreBoardData[9][0] == 10 && (roll == 2 || roll == 3))
  }

/* If there is a strike calculates accordingly */
  checkForStrike(frame: number, score: number, roll: number) {
    this.frame = frame;
    if (this.frame > 1) {
      if (this.scoreBoardData[this.frame - 1][0] == 10)
        this.totalScore += score;
      if (this.scoreBoardData[this.frame - 2][0] == 10 && this.scoreBoardData[this.frame - 1][0] == 10 && roll != 2)
        this.totalScore += score;
    }
    if (this.frame == 1) {
      if (this.scoreBoardData[this.frame - 1][0] == 10)
        this.totalScore += score;
    }

  }


/* If there is a spare calculates accordingly */
  checkForSpare(frame: number, score: number) {
    if (frame >= 1 && this.scoreBoardData[frame - 1][0] + this.scoreBoardData[frame - 1][1] == 10) {
      this.totalScore += score;
    }
  }

  ngOnDestroy() {

  }
}

