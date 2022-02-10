export interface LocationJson {
  id: number;
  country: string;
  state: string;
  city: string;
  zipcode: number;
  street: string;
  houseNr: number;
}

export class Location {
  private _id!: number;

  constructor(
    private _country: string,
    private _state: string,
    private _city: string,
    private _zipcode: number,
    private _street: string,
    private _houseNr: number
  ) {}

  static fromJSON(json: LocationJson): Location {
    const loc = new Location(
      json.country,
      json.state,
      json.city,
      json.zipcode,
      json.street,
      json.houseNr
    );
    loc._id = json.id;
    return loc;
  }

  toJSON(): LocationJson {
    return <LocationJson>{
      country: this.country,
      state: this.state,
      city: this.city,
      zipcode: this.zipcode,
      street: this.street,
      houseNr: this.houseNr,
    };
  }
  get id(): number {
    return this._id;
  }
  get country(): string {
    return this._country;
  }
  get state(): string {
    return this._state;
  }

  get city(): string {
    return this._city;
  }
  get zipcode(): number {
    return this._zipcode;
  }
  get street(): string {
    return this._street;
  }
  get houseNr(): number {
    return this._houseNr;
  }
}
