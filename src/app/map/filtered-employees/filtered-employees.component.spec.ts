import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredEmployeesComponent } from './filtered-employees.component';

describe('FilteredEmployeesComponent', () => {
  let component: FilteredEmployeesComponent;
  let fixture: ComponentFixture<FilteredEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
