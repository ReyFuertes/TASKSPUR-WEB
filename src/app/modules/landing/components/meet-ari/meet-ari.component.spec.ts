import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetAriComponent } from './meet-ari.component';

describe('MeetAriComponent', () => {
  let component: MeetAriComponent;
  let fixture: ComponentFixture<MeetAriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetAriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetAriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
