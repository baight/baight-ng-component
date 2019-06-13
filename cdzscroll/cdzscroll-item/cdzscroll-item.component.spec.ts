import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDZScrollItemComponent } from './cdzscroll-item.component';

describe('CDZScrollItemComponent', () => {
  let component: CDZScrollItemComponent;
  let fixture: ComponentFixture<CDZScrollItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDZScrollItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDZScrollItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
