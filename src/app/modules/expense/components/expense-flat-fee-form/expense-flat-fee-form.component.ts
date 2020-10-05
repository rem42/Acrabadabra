import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlatFee } from '@model/flat-fee.model';
import { TimesheetService } from '../../../timesheet/services/timesheet.service';
import { Regex } from '@utils/regex';

@Component({
  selector: 'app-expense-flat-fee-form',
  templateUrl: './expense-flat-fee-form.component.html',
  styleUrls: ['./expense-flat-fee-form.component.scss'],
})
export class ExpenseFlatFeeFormComponent implements OnInit {
  @Input() flatFees: FlatFee[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  form = new FormGroup({
    date: new FormControl(null, [Validators.required, Validators.pattern(Regex.DATE)]),
    amount: new FormControl(null, [Validators.required, Validators.pattern(Regex.AMOUNT)]),
  });

  constructor(public timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.flatFees = this.timesheetService.timesheet.flatFees;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.flatFees.push(Object.assign(new FlatFee(), this.form.getRawValue()));
    this.changed.emit(true);
  }
}
