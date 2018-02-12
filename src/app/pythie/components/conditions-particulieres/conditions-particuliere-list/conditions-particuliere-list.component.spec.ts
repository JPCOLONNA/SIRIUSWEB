import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsParticuliereListComponent } from './conditions-particuliere-list.component';

describe('ConditionsParticuliereListComponent', () => {
  let component: ConditionsParticuliereListComponent;
  let fixture: ComponentFixture<ConditionsParticuliereListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsParticuliereListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsParticuliereListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
