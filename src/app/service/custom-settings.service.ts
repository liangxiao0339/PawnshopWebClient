import { Injectable } from '@angular/core';

@Injectable()
export class CustomSettingsService {
    tokenKey: string;
    LoggedInDefaultRoute: string;
    loginRoute: string;

    constructor() {
        this.tokenKey = 'token';
        this.LoggedInDefaultRoute = '/pawnGoods';
        this.loginRoute = '/login';
    }
}
