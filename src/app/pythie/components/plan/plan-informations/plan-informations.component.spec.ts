import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInformationsComponent } from './plan-informations.component';

describe('PlanInformationsComponent', () => {
  let component: PlanInformationsComponent;
  let fixture: ComponentFixture<PlanInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
