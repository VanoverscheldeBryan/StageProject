import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/models/location';
import { ProductService } from 'src/app/services/product.service';

export interface State {
  name: String;
  cities: Location[];
}

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.sass'],
})
export class LocationFilterComponent implements OnInit {
  @Input() allLocations: Location[] = [];
  @Input() checkedLocations: Location[] = [];
  @Output() locationsFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() availableLocations: Location[] = []
  public selectedState: State;
  public states: State[] = [];
  public filter!: string;
  public isMobile: boolean = false
  public showFullWidth = false
  constructor(private _route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.convertLocationsToStates();
    // this.readCheckedLocationsFromUrl();
  }

  // NOTE: makeStateObjects -> convertLocationsToStates
  private convertLocationsToStates() {
    this.allLocations.forEach((location) => {
      const index = this.states.findIndex(
        (state) => state.name == location.state
      );
      if (index != -1) {
        // existing state
        this.states[index].cities.push(location);
      } else {
        // new state
        let newState = <State>{ name: location.state, cities: [location] };
        this.states.push(newState);
      }
    });

    if (this.states.length) this.selectState(this.states[0]);
  }

  public selectState(state: State) {
    this.selectedState = state;
  }

  public checkedLocation(location: Location, e: any) {
    if (e.target.checked) {
      this.checkedLocations.push(location);
    } else {
      let index = this.checkedLocations.findIndex(
        (checkedLocation) => checkedLocation.id == location.id
      );
      this.checkedLocations.splice(index, 1);
    }
    let checkedLocationsUrlObject = this.checkedLocations.length
      ? {
          cities: this.checkedLocations
            .map((checkedLocation) => checkedLocation.city)
            .join(','),
        }
      : { cities: null };
    this.locationsFilter.emit(checkedLocationsUrlObject);
  }

  public isChecked(id: any): boolean {
    let index = this.checkedLocations.findIndex(
      (checkedLocation) => checkedLocation.id == id
    );
    return index != -1;
  }

  public disable(id: any): boolean {
    let index = this.availableLocations.findIndex(
      (checkedLocation) => checkedLocation.id == id
    );
    return index == -1;
  }

}
