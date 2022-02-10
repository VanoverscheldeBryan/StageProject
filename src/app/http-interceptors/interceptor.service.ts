import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}
  // this.spinner.hide('ball-clip-rotate-multiple');
  // this.spinner.show('sp1');
  count = 0;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show('sp1');

    this.count++;

    return next
      .handle(req)

      .pipe(
     
        finalize(() => {
          this.count--;

          if (this.count == 0) {
              this.spinner.hide('sp1');
          }
        })
      );
  }
}
