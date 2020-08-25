import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Invoice } from 'src/app/shared/models/invoice.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input() invoice: Invoice;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.invoice) {
      this.invoice = new Invoice();
    }

    // Only init date when create new CRA
    if ('create' === this.route.snapshot.routeConfig.path) {
      this.invoice.date = moment().format('YYYY-MM-DD');
    }

    this.form.valueChanges.subscribe(() => {
      if (this.form.dirty) {
        this.changed.emit(true);
      }
    });
  }
}
