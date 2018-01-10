import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCouvertureComponent } from './formulaire-couverture.component';

describe('FormulaireCouvertureComponent', () => {
  let component: FormulaireCouvertureComponent;
  let fixture: ComponentFixture<FormulaireCouvertureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireCouvertureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCouvertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
