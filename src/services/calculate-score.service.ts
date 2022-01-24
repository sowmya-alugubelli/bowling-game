import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculateScoreService {

  constructor() { }
  scoreDataSource = new BehaviorSubject([0,0,0]);
  scoreData = this.scoreDataSource.asObservable();

  calculateScore(data:Array<number>) : any {
    this.scoreDataSource.next(data); 
  }

}
