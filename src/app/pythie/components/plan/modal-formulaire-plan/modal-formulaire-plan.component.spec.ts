import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormulairePlanComponent } from './modal-formulaire-plan.component';

describe('ModalFormulairePlanComponent', () => {
  let component: ModalFormulairePlanComponent;
  let fixture: ComponentFixture<ModalFormulairePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormulairePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormulairePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
