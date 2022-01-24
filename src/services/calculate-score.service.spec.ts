import { TestBed } from '@angular/core/testing';

import { CalculateScoreService } from './calculate-score.service';

describe('CalculateScoreService', () => {
  let service: CalculateScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calculateScore method returns the data to the score-board component', () => {
    let data = [3,2,1]
    spyOn(service,'calculateScore');
    expect(service.calculateScore).toBeTrue; 
  })

});
