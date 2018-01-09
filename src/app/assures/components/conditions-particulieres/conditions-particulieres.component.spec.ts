import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsParticulieresComponent } from './conditions-particulieres.component';

describe('ConditionsParticulieresComponent', () => {
  let component: ConditionsParticulieresComponent;
  let fixture: ComponentFixture<ConditionsParticulieresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsParticulieresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsParticulieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
