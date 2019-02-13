import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Params, ActivatedRoute } from '@angular/router';

import { Timesheet } from 'src/app/shared/models/timesheet.model';
import { Commute } from '../../../../shared/models/commute';

import { CalendarService } from 'src/app/modules/calendar/calendar.service';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-review',
  templateUrl: './timesheet-review.component.html',
  styleUrls: ['./timesheet-review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetReviewComponent implements OnInit {
  timesheet = new Timesheet();
  generateInvoice = false;
  invoiceLink: string;
  date: Date;
  locale = 'fr';
  workingTime: number;
  commutes: Commute[];
  showAllowanceTable = false;
  showMiscellaneousTable = false;

  constructor(
    private calendarManager: CalendarService,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.timesheetService.openTimesheet(params['data'], 'review')) {
        this.timesheet = this.timesheetService.timesheet;
        this.date = this.calendarManager.getDate(this.timesheet);
        this.workingTime = this.calendarManager.getWorkedTime(this.timesheet);

        if (this.timesheet.invoice) {
           this.invoiceLink = this.timesheetService.getInvoiceLink();
           this.generateInvoice = true;
        }

        if (this.timesheetService.timesheet.commutes.length > 0) {
          this.showAllowanceTable = true;
        }

        if (this.timesheetService.timesheet.miscellaneous.length > 0) {
          this.showMiscellaneousTable = true;
        }
      }
    });

    this.titleService.setTitle('Acradababra - Consulter un compte rendu d\'activité');

  }

}
