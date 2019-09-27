import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomSettingsService } from './custom-settings.service';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient, private customSettings: CustomSettingsService) { }

    public isLoginIn = false;

    loginIn(loginModel): Observable<any> {
        return this.http.post<any>('http://localhost:5000/api/login/loginIn', loginModel);
    }

    loginOut() {
        sessionStorage.removeItem(this.customSettings.tokenKey);
    }
}
