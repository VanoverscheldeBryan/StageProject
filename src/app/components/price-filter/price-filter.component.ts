import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.sass'],
})
export class PriceFilterComponent implements OnInit {
  public PriceMax: string = '';
  public PriceMin: string = '';
  public inputPriceMax = new Subject<string>();
  public inputPriceMin = new Subject<string>();

  constructor(private router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.inputPriceMax
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val: any) => {
        this.PriceMax = val;
        this.updateQueryParamsMax();
        if (val == 0) {
          this.updateQueryParamsMaxNull();
        }
      });
    this.inputPriceMin
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val: any) => {
        this.PriceMin = val;
        this.updateQueryParamsMin();
        if (val == 0) {
          this.updateQueryParamsMinNull();
        }
      });
    this._route.queryParams.subscribe((params) => {
      if (this.PriceMin != null) {
        this.PriceMin = params.filterMin;
      }
      if (this.PriceMin == undefined) {
        this.PriceMin = '';
      }
      if (this.PriceMax != null) {
        this.PriceMax = params.filterMax;
      }
      if (this.PriceMax == undefined) {
        this.PriceMax = '';
      }
    });
  }
  private updateQueryParamsMin() {
    this.router.navigate(['products'], {
      queryParams: { filterMin: this.PriceMin },
      queryParamsHandling: 'merge',
    });
  }
  private updateQueryParamsMax() {
    this.router.navigate(['products'], {
      queryParams: { filterMax: this.PriceMax },
      queryParamsHandling: 'merge',
    });
  }
  private updateQueryParamsMaxNull() {
    this.router.navigate(['products'], {
      queryParams: { filterMax: null },
      queryParamsHandling: 'merge',
    });
  }
  private updateQueryParamsMinNull() {
    this.router.navigate(['products'], {
      queryParams: { filterMin: null },
      queryParamsHandling: 'merge',
    });
  }
}
