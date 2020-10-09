import { ExpenseMileageFormComponent } from './expense-mileage-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseMileageTableComponent } from '../expense-mileage-table/expense-mileage-table.component';

describe('Component: ExpenseMileageForm', () => {
  let component: ExpenseMileageFormComponent;
  let fixture: ComponentFixture<ExpenseMileageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ExpenseMileageFormComponent, ExpenseMileageTableComponent],
    });

    fixture = TestBed.createComponent(ExpenseMileageFormComponent);

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('date field validity', () => {
    const date = component.form.get('date');
    expect(date.valid).toBeFalsy();

    expect(date.hasError('required')).toBeTruthy();

    date.setValue('test');

    expect(date.hasError('pattern')).toBeTruthy();
    expect(date.hasError('required')).toBeFalsy();

    date.setValue('2020-01-01');

    expect(date.hasError('pattern')).toBeFalsy();
    expect(date.hasError('required')).toBeFalsy();
  });
});
