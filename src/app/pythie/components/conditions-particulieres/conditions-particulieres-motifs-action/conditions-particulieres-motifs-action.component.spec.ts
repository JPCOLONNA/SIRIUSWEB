import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsParticulieresMotifsActionComponent } from './conditions-particulieres-motifs-action.component';

describe('ConditionsParticulieresMotifsActionComponent', () => {
  let component: ConditionsParticulieresMotifsActionComponent;
  let fixture: ComponentFixture<ConditionsParticulieresMotifsActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsParticulieresMotifsActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsParticulieresMotifsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
