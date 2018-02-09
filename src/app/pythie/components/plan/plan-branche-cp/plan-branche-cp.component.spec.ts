import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBrancheCpComponent } from './plan-branche-cp.component';

describe('PlanBrancheCpComponent', () => {
  let component: PlanBrancheCpComponent;
  let fixture: ComponentFixture<PlanBrancheCpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanBrancheCpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanBrancheCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
