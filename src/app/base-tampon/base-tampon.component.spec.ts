import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTamponComponent } from './base-tampon.component';

describe('BaseTamponComponent', () => {
  let component: BaseTamponComponent;
  let fixture: ComponentFixture<BaseTamponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseTamponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTamponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
