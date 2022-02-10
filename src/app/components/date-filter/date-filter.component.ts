import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timeslot } from 'src/app/models/timeslot';

import { DateTimeSlots } from 'src/app/models/datetimeslots';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.sass'],
})
export class DateFilterComponent implements OnInit {
  @Input() allTimeslots!: Timeslot[];
  @Input() checkedTimeslots!: Timeslot[];
  @Input() availableTimeslots!: Timeslot[];
  @Output() timeslotFilter: EventEmitter<any> = new EventEmitter<any>();

  public timeslots: Timeslot[] = [];
  public dates: Array<Date> = [];
  public selectedDate!: Date;
  public selectedTimeslot!: Timeslot;
  public dateTimeSlots: Array<DateTimeSlots> = [];
  public isTimeslotChecked: boolean = true;
  public isDateSelected: boolean = false;
  public showAllTimes: boolean = false;
  public showMoreOrLessTimeslots: boolean = false;
  public setting!: number;
  public slidesToShow: number;
  public slidesToScroll: number;
  public showFullWidth: boolean = false;

  slideConfig = { slidesToShow: 7, slidesToScroll: 7, infinite: false };

  addSlide() {
    this.dates.push();
  }

  removeSlide() {
    this.dates.length = this.dates.length - 1;
  }

  constructor() {}

  ngOnInit(): void {
    this.getAllDatesAndTimeSlots();
  }



  private getAllDatesAndTimeSlots() {
    for (let day = -1; day <= 24; day++) {
      let currentDay = new Date();
      let theDate = currentDay.getDate();
      currentDay.setDate(theDate + day + 1);
      let dateTimeSlot = { date: currentDay, timeSlots: [] };
      this.dateTimeSlots.push(dateTimeSlot);
      this.displayDatesWithFreeSlots(dateTimeSlot);
    }
  }

  public clickDate(date: DateTimeSlots) {

    if (date.timeSlots.length > 0) {
      this.timeslots.length = 0;
      this.getTimeSlotsOfCurrentDate(date);
      this.checkAmountOfTimeSlots(date);
      this.selectedDate = date.date;
    }
  }
  public clickTimeslot(timeslot: Timeslot, e: any) {
    this.checkedTimeslots.length = 0;
    if (e.target.checked) {
      this.checkedTimeslots.push(timeslot);
      this.selectedTimeslot = timeslot;
    } else {
      let index = this.checkedTimeslots.findIndex(
        (checkedTimeslot) => checkedTimeslot.id == e.target.id
      );
      this.checkedTimeslots.splice(index, 1);
    }
    let checkedTimeslotssUrlObject = this.checkedTimeslots.length
      ? {
          timeslots: this.checkedTimeslots
            .map((checkedTimeslot) => checkedTimeslot.id)
            .join(','),
        }
      : { timeslots: null };
    this.timeslotFilter.emit(checkedTimeslotssUrlObject);
  }

  private displayDatesWithFreeSlots(date: DateTimeSlots) {
    for (let timeslot of this.allTimeslots) {
      let datesWithSlots = `${date.date.toLocaleDateString()}`;
      let slots = `${timeslot.startDate.toLocaleDateString()}`;
      if (datesWithSlots == slots) {
        date.timeSlots.push(timeslot);
      }
    }
  }
  private getTimeSlotsOfCurrentDate(date: DateTimeSlots) {
    for (let item of this.allTimeslots) {
      if (`${date.date}`.slice(0, 10) == `${item.startDate}`.slice(0, 10)) {
        this.timeslots.push(item);
      }
    }
  }

  private checkAmountOfTimeSlots(date: DateTimeSlots) {
    if (date.timeSlots.length > 8) {
      this.showMoreOrLessTimeslots = true;
    } else {
      this.showMoreOrLessTimeslots = false;
    }
  }

  public checked(id: any): boolean {
    let index = this.checkedTimeslots.findIndex(
      (timeslot) => timeslot.id == id
    );

    return index != -1;
  }
  public disable(id: any): boolean {
    let index = this.availableTimeslots.findIndex(
      (checkedTimeslot) => checkedTimeslot.id == id
    );
    return index == -1;
  }
}
