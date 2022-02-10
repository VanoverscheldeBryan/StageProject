import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { Location } from '../models/location';
import { environment } from 'src/environments/environment';
import { ExceptionHandlerService } from './exception-handler-service.service';


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient, private exceptionHandlerService: ExceptionHandlerService) {}

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.api_url+'/locations').pipe(
      catchError(this.exceptionHandlerService.handleError),
      map((list: any[]): Location[] => list.map(Location.fromJSON))
    );
  }

}
