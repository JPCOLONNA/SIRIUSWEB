import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListePiecesComponent } from './modal-liste-pieces.component';

describe('ModalListePiecesComponent', () => {
  let component: ModalListePiecesComponent;
  let fixture: ComponentFixture<ModalListePiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListePiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListePiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
