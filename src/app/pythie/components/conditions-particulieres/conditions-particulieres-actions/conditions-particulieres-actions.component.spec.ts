import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsParticulieresActionsComponent } from './conditions-particulieres-actions.component';

describe('ConditionsParticulieresActionsComponent', () => {
  let component: ConditionsParticulieresActionsComponent;
  let fixture: ComponentFixture<ConditionsParticulieresActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsParticulieresActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsParticulieresActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
