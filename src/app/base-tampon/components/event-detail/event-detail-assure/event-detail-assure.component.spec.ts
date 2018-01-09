import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailAssureComponent } from './event-detail-assure.component';

describe('EventDetailAssureComponent', () => {
  let component: EventDetailAssureComponent;
  let fixture: ComponentFixture<EventDetailAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
