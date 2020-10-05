import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Commute } from '@model/commute';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { VehiclesService } from '../../services/vehicles.service';
import { Regex } from '@utils/regex';
import { FlatFee } from '@model/flat-fee.model';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-expense-mileage-form',
  templateUrl: './expense-mileage-form.component.html',
  styleUrls: ['./expense-mileage-form.component.scss'],
})
export class ExpenseMileageFormComponent implements OnInit {
  @Input() commutes: Commute[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  form = new FormGroup({
    date: new FormControl(null, [Validators.required, Validators.pattern(Regex.DATE)]),
    journey: new FormControl(null, [Validators.required, Validators.pattern(Regex.TEXT_WITHOUT_ACCENT)]),
    distance: new FormControl(null, [Validators.required, Validators.pattern(Regex.NUMBERS)]),
    vehicleSelected: new FormControl(null, [Validators.required]),
    allowance: new FormControl(null),
  });

  constructor(public vehiclesService: VehiclesService, public timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.commutes = this.timesheetService.timesheet.commutes;

    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue();

    if (!this.vehiclesService.isCustomizable(formValues.vehicleSelected)) {
      formValues.allowance = this.vehiclesService.vehicles[formValues.vehicleSelected].allowance;
    }

    formValues.mileageAllowance = formValues.distance * formValues.allowance;
    const commute = plainToClass(Commute, formValues);
    this.commutes.push(commute);
    this.changed.emit(true);
  }
}
