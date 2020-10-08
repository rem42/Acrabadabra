import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TimesheetService } from 'src/app/modules/timesheet/services/timesheet.service';
import { MiscellaneousExpensesService } from '../../services/miscellaneous-expenses.service';
import { Miscellaneous } from '@model/miscellaneous.model';
import { MonetaryService } from '@services/monetary/monetary.service';
import { Regex } from '@utils/regex';

@Component({
  selector: 'app-expense-miscellaneous-form',
  templateUrl: './expense-miscellaneous-form.component.html',
  styleUrls: ['./expense-miscellaneous-form.component.scss'],
})
export class ExpenseMiscellaneousFormComponent implements OnInit {
  @Input() miscellaneous: Miscellaneous[];
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  form = new FormGroup({
    date: new FormControl(null, [Validators.required, Validators.pattern(Regex.DATE)]),
    amount: new FormControl(null, [Validators.required, Validators.pattern(Regex.AMOUNT)]),
    expenseType: new FormControl(null, [Validators.required]),
    tvaRate: new FormControl(null),
    wording: new FormControl(null),
  });

  misc: Miscellaneous;
  miscellaneousTypes = MiscellaneousExpensesService.MISCELLANEOUS_TYPES;
  vatRates = MonetaryService.arrayVat;

  constructor(
    public miscellaneousExpensesService: MiscellaneousExpensesService,
    public timesheetService: TimesheetService,
    private readonly _monetaryService: MonetaryService,
  ) {}

  ngOnInit() {
    this.misc = new Miscellaneous();
    this.miscellaneous = this.timesheetService.timesheet.miscellaneous;
    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }

  showColumn(): boolean {
    return (
      this.form.get('expenseType').value !== undefined &&
      this.form.get('expenseType').value !== null &&
      this.form.get('expenseType').value.vatDeductible &&
      undefined === this.form.get('expenseType').value.vat
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValues = this.form.getRawValue();
    if (rawValues.expenseType.vat === undefined && !rawValues.expenseType.vatDeductible) {
      rawValues.tvaRate = 'NC';
    }
    if (rawValues.expenseType.vat !== undefined) {
      rawValues.tvaRate = rawValues.expenseType.vat;
    }
    rawValues.miscellaneousType = rawValues.expenseType.type;

    this.miscellaneous.push(
      new Miscellaneous(
        rawValues.expenseType.type,
        rawValues.tvaRate,
        rawValues.wording,
        rawValues.date,
        rawValues.amount,
      ),
    );
    this.changed.emit(true);
  }
}
