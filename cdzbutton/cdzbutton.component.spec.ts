import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDZButtonComponent } from './cdzbutton.component';

describe('CDZButtonComponent', () => {
  let component: CDZButtonComponent;
  let fixture: ComponentFixture<CDZButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDZButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDZButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
