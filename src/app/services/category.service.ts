import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category';
import { ExceptionHandlerService } from './exception-handler-service.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private exceptionHandlerService : ExceptionHandlerService) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api_url +'/categories').pipe(
      catchError(this.exceptionHandlerService.handleError),
      map((list: any[]): Category[] => list.map(Category.fromJSON))
    );
  }

  public getCategoryById(id: number): Observable<Category>{
    return this.http.get<Category>(environment.api_url + `/categories/${id}`);  }


}
