import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDZScrollComponent } from './cdzscroll.component';

describe('CDZScrollComponent', () => {
  let component: CDZScrollComponent;
  let fixture: ComponentFixture<CDZScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDZScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDZScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
