import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDZStatusComponent } from './cdzstatus.component';

describe('CDZStatusComponent', () => {
  let component: CDZStatusComponent;
  let fixture: ComponentFixture<CDZStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDZStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDZStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
