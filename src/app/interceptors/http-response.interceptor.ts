import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ErrorService} from "../services/error.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private readonly errorService: ErrorService,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Unauthorized access!')
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            if (this.authService.isAdmin() || this.authService.isCustomer()) {
              console.log("No")
              this.errorService.setErrorMessage('You need login again.');
              this.authService.logout();
              this.router.navigate(['login']).catch(reason => console.error(reason));
            }
          } else if (error.status === 404) {
            alert('Page Not Found!')
          } else if (error.status == 0) {
            this.errorService.setErrorMessage('Cannot connect to server!');
          }
        }
      }));
  }
}

