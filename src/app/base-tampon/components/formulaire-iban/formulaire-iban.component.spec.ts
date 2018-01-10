import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireIbanComponent } from './formulaire-iban.component';

describe('FormulaireAssureComponent', () => {
  let component: FormulaireIbanComponent;
  let fixture: ComponentFixture<FormulaireIbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireIbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
