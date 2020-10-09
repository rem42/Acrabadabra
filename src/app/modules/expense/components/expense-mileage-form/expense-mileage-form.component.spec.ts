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

  it('journey field validity', () => {
    const journey = component.form.get('journey');

    expect(journey.valid).toBeFalsy();
    expect(journey.hasError('required')).toBeTruthy();

    journey.setValue('1234');
    expect(journey.hasError('pattern')).toBeTruthy();
    expect(journey.hasError('required')).toBeFalsy();

    journey.setValue('AR Annecy - Lyon');
    expect(journey.hasError('pattern')).toBeFalsy();
    expect(journey.hasError('required')).toBeFalsy();
  });

  it('distance field validity', () => {
    const distance = component.form.get('distance');

    expect(distance.valid).toBeFalsy();
    expect(distance.hasError('required')).toBeTruthy();

    distance.setValue('abcd');
    expect(distance.hasError('pattern')).toBeTruthy();
    expect(distance.hasError('required')).toBeFalsy();

    distance.setValue(42.5);
    expect(distance.hasError('pattern')).toBeFalsy();
    expect(distance.hasError('required')).toBeFalsy();

    distance.setValue(42);
    expect(distance.hasError('pattern')).toBeFalsy();
    expect(distance.hasError('required')).toBeFalsy();
  });

  it('vehicleSelected field validity', () => {
    const vehicleSelected = component.form.get('vehicleSelected');

    expect(vehicleSelected.valid).toBeFalsy();
    expect(vehicleSelected.hasError('required')).toBeTruthy();

    vehicleSelected.setValue(1);
    expect(vehicleSelected.hasError('pattern')).toBeFalsy();
    expect(vehicleSelected.hasError('required')).toBeFalsy();
  });

  it('onSubmit without valid form', () => {
    spyOn(component.form, 'markAllAsTouched');
    component.onSubmit();

    expect(component.form.valid).toBeFalsy();
    expect(component.form.markAllAsTouched).toHaveBeenCalledTimes(1);
  });

  it('onSubmit with valid form', () => {
    const form = component.form;
    form.get('date').setValue('2020-01-01');
    form.get('journey').setValue('AR Annecy - Lyon');
    form.get('distance').setValue(42);
    form.get('vehicleSelected').setValue(1);
  });
});
