import { ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';

import { CalculateScoreService } from '../../services/calculate-score.service';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;
  let service: CalculateScoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreBoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getScore on init method', () => {
    spyOn(component, 'getScore').and.callThrough();
    component.ngOnInit();
    expect(component.getScore).toHaveBeenCalled();
  })

  it('should call calculate total score on calling calcTotalScore method ', fakeAsync(() =>  {
    component.totalScore=4;
    component.calcTotalScore(6,2,1);
    spyOn(component, 'calcTotalScore')
    expect(component.totalScore).toEqual(10);
  })) 

  it('should call checkForLastScenario while calculating the score', fakeAsync(() =>  {
    spyOn(component, 'checkForLastScenario').and.callThrough();
    component.roll=1;
    let result = component.checkForLastScenario(6,9,1);
    expect(result).toBe(false);
    
  })) 


  it('should check for spare when roll is 1', fakeAsync(() =>  {
    spyOn(component, 'checkForSpare').and.callThrough();
    component.roll=1;
    component.calcTotalScore(6,2,1);
    expect(component.checkForSpare).toHaveBeenCalled();
  })) 


  it('should check for strike condition while calculating the score ', fakeAsync(() =>  {
    component.checkForStrike(4,4,1);
    component.scoreBoardData[3][0]=10;
    component.totalScore=10;
    spyOn(component, 'checkForStrike');
    tick(); 
    expect(component.totalScore).toEqual(10);
   
  }))  

  it('should check for strike condition when frame is greater than 1 ', fakeAsync(() =>  {
    spyOn(component, 'checkForStrike').and.callThrough()
    component.frame=2;
    component.scoreBoardData[1][0]=10; 
    component.checkForStrike(2,5,1);
    expect(component.totalScore).toEqual(5);
  }))   

  it('should check for strike condition when frame is 1 ', fakeAsync(() =>  {
    spyOn(component, 'checkForStrike').and.callThrough()
    component.frame=1;
    component.scoreBoardData[0][0]=10;  
    component.checkForStrike(1,4,1);
    expect(component.totalScore).toEqual(4);
    
  }))  

  it('should check for spare condition when frame is greater than 1 ', fakeAsync(() =>  {
    spyOn(component, 'checkForSpare').and.callThrough()
    component.frame=1;
    component.scoreBoardData[0][0]=10;  
    component.checkForStrike(1,4,1);
    expect(component.totalScore).toEqual(4);
  }))  
  
}); 
