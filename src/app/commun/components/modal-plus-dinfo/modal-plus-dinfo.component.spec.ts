import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlusDinfoComponent } from './modal-plus-dinfo.component';

describe('ModalPlusDinfoComponent', () => {
  let component: ModalPlusDinfoComponent;
  let fixture: ComponentFixture<ModalPlusDinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlusDinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlusDinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
