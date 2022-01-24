import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { PinsComponent } from './pins.component';
import { By } from '@angular/platform-browser';

describe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;
  let dom: HTMLElement;
  let debugEle: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom = fixture.nativeElement;
    debugEle = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should have roll variable initialized to 1', () => {
    expect(component.roll).toEqual(1);
  })


  // test for creating pinCountArray
  it('should call generatePinArray(3) on init method', () => {
    spyOn(component, 'generatePinArray').and.callThrough();
    component.ngOnInit();
    expect(component.generatePinArray).toHaveBeenCalled();
  })

  it('generatePinArray method should set pinCountArray', () => {
    fixture.detectChanges();
    component.generatePinArray(3);
    expect(component.pinCountArray).toEqual([0, 1, 2, 3])
  });

  it('should call knockPin on clicking the pin', fakeAsync(() => {
    let pin = debugEle.queryAll(By.css('.pin-btn'))[0];
    spyOn(component, 'knockPin');
    pin.triggerEventHandler('click', null);
    expect(component.knockPin).toHaveBeenCalled();
  }));

  it('should take a roll', () => {
    component.frameCount=1;
    component.roll=1;
    component.knockPin(10);
    spyOn(component,'knockPin'); 
    expect(component.roll).toEqual(1);
  })

  it('should increment frame count on a strike', () => {
    component.frameCount=1;
    component.roll=1;
    component.knockPin(10);
    spyOn(component,'knockPin');
    expect(component.frameCount).toEqual(2);
  })

  it('should not increment frame count on  roll1 and not a strike', () => {
    spyOn(component,'knockPin');
    component.frameCount=1;
    component.roll=1;
    component.knockPin(6); 
    expect(component.frameCount).toEqual(1);
  })

  it('should swicth to next frame after second roll', fakeAsync(()  => {
    component.frameCount=1;
    component.roll=2;
    component.knockedPins = 6;
    component.knockPin(4);
    spyOn(component, 'knockPin');
    expect(component.frameCount).toEqual(2);
  })) 
  
 
  it('should call tenthFrameScenario', fakeAsync(()  => {
    spyOn(component, 'tenthFrameScenario').and.callThrough();
    component.tenthFrameScenario(4);
    expect(component.tenthFrameScenario).toHaveBeenCalled();
  })) 
  
  it('should increment the roll when pincount is 10 in frame 10', fakeAsync(()  => {
    spyOn(component, 'tenthFrameScenario').and.callThrough();
    component.tenthFrameScenario(10);
    expect(component.roll).toEqual(2);
  })) 

  it('should disable game when roll is 3 in frame 10', fakeAsync(()  => {
    spyOn(component, 'tenthFrameScenario').and.callThrough();
    component.roll=3;
    component.tenthFrameScenario(10);
    expect(component.isDisablePins).toEqual(true);
  })) 

  it('should disable game when roll is 2 and not a strike or spare', fakeAsync(()  => {
    spyOn(component, 'tenthFrameScenario').and.callThrough();
    component.roll=2;
    component.tenthFrameScenario(10);
    expect(component.isDisablePins).toEqual(false);
  })) 

}); 
