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
import { CustomSettingsService } from './custom-settings.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router, private customSettings: CustomSettingsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem(this.customSettings.tokenKey);
        request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });

        const requestParamKeys = request.params.keys();
        // 移除参数中 null/undefind 值，可能导致后端参数解析失败
        for (const itemParamKey of requestParamKeys) {
            const itemParamValue = request.params.get(itemParamKey);

            if (itemParamValue === null || itemParamValue === undefined) {
                request = request.clone({ params: request.params.delete(itemParamKey) });
            }
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    sessionStorage.removeItem(this.customSettings.tokenKey);
                    this.router.navigateByUrl(this.customSettings.loginRoute);
                }

                return throwError(error);
            })
        );
    }

}
