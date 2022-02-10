import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Timeslot } from '../models/timeslot';
import { ExceptionHandlerService } from './exception-handler-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  constructor(
    private http: HttpClient,
    private exceptionHandlerService: ExceptionHandlerService
  ) {}

  public getAllTimeSlots(): Observable<Timeslot[]> {
    return this.http.get<Timeslot[]>(environment.api_url + '/timeslots').pipe(
      catchError(this.exceptionHandlerService.handleError),
      map((list: any[]): Timeslot[] => list.map(Timeslot.fromJSON))
    );
  }
}
