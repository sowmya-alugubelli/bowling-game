import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PinsComponent } from 'src/components/pins/pins.component';
import { ScoreBoardComponent } from 'src/components/score-board/score-board.component';
import { AppComponent } from './app.component';


describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled:HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
 
  it(`should have as title 'Bowling Game'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Bowling Game');
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Bowling Game');
  });
});

