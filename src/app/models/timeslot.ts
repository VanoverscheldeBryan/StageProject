interface TimeslotJson {
  id: Number;
  startDate: Date;
  endDate: Date;

}

export class Timeslot {
  private _id!: Number;

  constructor(
    private _startDate: Date,
    private _endDate: Date,

  ) {}

  static fromJSON(json: TimeslotJson): Timeslot {
    const timeslot = new Timeslot(
      new Date(json.startDate),
      new Date(json.endDate),

    );
    timeslot._id = json.id;
    return timeslot;
  }

  toJSON(): TimeslotJson {
    return <TimeslotJson>{
      startDate: this.startDate,
      endDate: this.endDate,

    };
  }
  get id(): Number {
    return this._id;
  }
  
  get startDate(): Date {
    return this._startDate;
  }
  get endDate(): Date {
    return this._endDate;
  }

}

