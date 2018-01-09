import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAssureComponent } from './formulaire-assure.component';

describe('FormulaireAssureComponent', () => {
  let component: FormulaireAssureComponent;
  let fixture: ComponentFixture<FormulaireAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
