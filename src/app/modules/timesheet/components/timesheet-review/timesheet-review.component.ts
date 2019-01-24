import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Params, ActivatedRoute } from '@angular/router';

import { Timesheet } from 'src/app/shared/models/timesheet.model';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';

import { TimesheetService } from '../../timesheet.service';


@Component({
  selector: 'app-review',
  templateUrl: './timesheet-review.component.html',
  styleUrls: ['./timesheet-review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetReviewComponent implements OnInit {
  timesheet = new Timesheet();
  generateInvoice = false;
  invoiceToken: string;
  date: Date;
  locale = 'fr';
  workingTime: number;

  constructor(
    public calendarService: CalendarService,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.timesheetService.openTimesheet(params['data'], 'review')) {
        this.timesheet = this.timesheetService.timesheet;
        this.calendarService.openWorkingDays(this.timesheet.workingDays);
        this.workingTime = this.calendarService.getWorkedTime();

        if (this.timesheet.invoice) {
           this.invoiceToken = params['data'];
           this.generateInvoice = true;
        }
      }
    });

    this.titleService.setTitle('Acradababra - Consulter un compte rendu d\'activité');

  }

}