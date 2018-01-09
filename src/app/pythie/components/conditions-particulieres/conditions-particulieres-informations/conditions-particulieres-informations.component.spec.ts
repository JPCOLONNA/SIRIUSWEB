import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsParticulieresInformationsComponent } from './conditions-particulieres-informations.component';

describe('ConditionsParticulieresInformationsComponent', () => {
  let component: ConditionsParticulieresInformationsComponent;
  let fixture: ComponentFixture<ConditionsParticulieresInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsParticulieresInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsParticulieresInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
