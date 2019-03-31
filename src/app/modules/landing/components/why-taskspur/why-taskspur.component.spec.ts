import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyTaskspurComponent } from './why-taskspur.component';

describe('WhyTaskspurComponent', () => {
  let component: WhyTaskspurComponent;
  let fixture: ComponentFixture<WhyTaskspurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyTaskspurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyTaskspurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
