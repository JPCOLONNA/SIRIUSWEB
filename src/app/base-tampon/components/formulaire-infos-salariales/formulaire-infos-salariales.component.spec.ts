import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireInfosSalarialesComponent } from './formulaire-infos-salariales.component';

describe('FormulaireInfosSalarialesComponent', () => {
  let component: FormulaireInfosSalarialesComponent;
  let fixture: ComponentFixture<FormulaireInfosSalarialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireInfosSalarialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireInfosSalarialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
