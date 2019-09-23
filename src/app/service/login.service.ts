import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    public isLoginIn = false;

    loginIn(loginModel): Observable<any> {
        return this.http.post<any>('http://localhost:5000/api/login/loginIn', loginModel);
    }

    loginOut() {
        sessionStorage.removeItem('token');
    }
}
