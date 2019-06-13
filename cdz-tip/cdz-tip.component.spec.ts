import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDZTipComponent } from './cdz-tip.component';

describe('CdzTipComponent', () => {
  let component: CDZTipComponent;
  let fixture: ComponentFixture<CDZTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDZTipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDZTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
