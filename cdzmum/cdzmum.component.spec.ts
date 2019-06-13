import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDZMumComponent } from './cdzmum.component';

describe('CDZMumComponent', () => {
  let component: CDZMumComponent;
  let fixture: ComponentFixture<CDZMumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDZMumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDZMumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
