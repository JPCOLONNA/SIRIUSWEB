import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListesStructureComponent } from './modal-listes-structure.component';

describe('ModalListesStructureComponent', () => {
  let component: ModalListesStructureComponent;
  let fixture: ComponentFixture<ModalListesStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListesStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListesStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
