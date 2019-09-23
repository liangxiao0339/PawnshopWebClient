import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
 } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem(environment.tokenKey);
        request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    sessionStorage.removeItem(environment.tokenKey);
                    this.router.navigateByUrl(environment.loginRoute);
                }

                return throwError(error);
            })
        );
    }

}
