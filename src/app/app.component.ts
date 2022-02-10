import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('5ms', style({ opacity: 0 })),
  ]),
]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public isMobile : boolean = false
  title = 'BPR';
  public spinnerType!: string;
  public spinnerName!: string;
  constructor() {
    this.spinnerName = 'sp1';
    this.spinnerType = 'square-loader';
  }
  ngOnInit() {

  }
  breadcrumbConfig: object = {
    bgColor: '#eee',
    fontSize: '18px',
    fontColor: '#FF4C3B',
    lastLinkColor: '#000',
    symbol: ' / ',
  };

}
