import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCriteresApplicationComponent } from './plan-criteres-application.component';

describe('PlanCriteresApplicationComponent', () => {
  let component: PlanCriteresApplicationComponent;
  let fixture: ComponentFixture<PlanCriteresApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCriteresApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCriteresApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
