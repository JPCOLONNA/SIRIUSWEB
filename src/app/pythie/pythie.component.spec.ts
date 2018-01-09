import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythieComponent } from './pythie.component';

describe('PythieComponent', () => {
  let component: PythieComponent;
  let fixture: ComponentFixture<PythieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
