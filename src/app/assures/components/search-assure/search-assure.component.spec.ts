import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAssureComponent } from './search-assure.component';

describe('SearchAssureComponent', () => {
  let component: SearchAssureComponent;
  let fixture: ComponentFixture<SearchAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
