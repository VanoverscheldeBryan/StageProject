import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forEach } from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DateTimeSlots } from 'src/app/models/datetimeslots';
import { Timeslot } from 'src/app/models/timeslot';
import { TimeSlotService } from 'src/app/services/timeslot.service';

@Component({
  selector: 'app-month-date-filter',
  templateUrl: './month-date-filter.component.html',
  styleUrls: ['./month-date-filter.component.sass'],
})
export class MonthDateFilterComponent implements OnInit {
  @Input() allTimeslots!: Timeslot[];
  @Input() checkedTimeslots!: Timeslot[];
  @Input() availableTimeslots!: Timeslot[];

  @Output() timeslotFilter: EventEmitter<any> = new EventEmitter<any>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  public minDate = new Date();
  public maxDate = new Date(2022, 0, 1);
  public startDate: Date;
  public endDate: Date;

  public validDates: Date[] = [];
  constructor() {}

  ngOnInit(): void {
    this.checkedTimeslotsRemember();
  }

  public checkedTimeslotsRemember() {
    this.checkedTimeslots.forEach((timeslot) => {
      console.log(timeslot);
      this.startDate = timeslot.startDate;
      this.endDate = timeslot.endDate;
    });
  }
  public clearDate() {
    this.startDate = null;
    this.endDate = null;
    this.OnDateChange();
  }

  public dateFilter = (d: Date): boolean => {
    let enableFlag = false;
    this.allTimeslots.some((date) => {
      // show available startDates
      if (
        date.startDate.toLocaleDateString() ==
          d.toLocaleDateString() ||
        date.endDate.toLocaleDateString() ==
          d.toLocaleDateString()
      ) {
        enableFlag = true;
        return true;
      }


      return false;
    });
    return enableFlag;
  };

  public OnDateChange() {
    //momentele datums met range die werken zijn 13/06 - 14/06 & 13/06-15/06 (zie db.json)
    this.checkedTimeslots.length = 0;
    if (this.startDate != undefined && this.endDate != undefined) {
      let indexTimeslot = this.allTimeslots.find(
        (timeslot) =>
          timeslot.startDate.toLocaleDateString() +
            timeslot.endDate.toLocaleDateString() ==
          this.startDate.toLocaleDateString() +
            this.endDate.toLocaleDateString()
      );
      if (indexTimeslot == undefined) {
        this.timeslotFilter.emit({ timeslots: null });
      }
      if (indexTimeslot != undefined) {
        console.log(indexTimeslot.id);
        this.checkedTimeslots.push(indexTimeslot);
        let checkedTimeslotssUrlObject = this.checkedTimeslots.length
          ? {
              timeslots: this.checkedTimeslots
                .map((checkedTimeslot) => checkedTimeslot.id)
                .join(','),
            }
          : { timeslots: null };
        this.timeslotFilter.emit(checkedTimeslotssUrlObject);
      }
    }
    if (this.startDate == null && this.endDate == null) {
      let checkedTimeslotssUrlObject = { timeslots: null };
      this.timeslotFilter.emit(checkedTimeslotssUrlObject);
    }
  }

}
