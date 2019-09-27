import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { environment } from 'src/environments/environment';
import { CustomSettingsService } from '../service/custom-settings.service';

@Injectable()
export class AuthGurad implements CanActivate, CanActivateChild {
    constructor(private router: Router, private login: LoginService, private customSettings: CustomSettingsService ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isLogin();
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(next, state);
    }

    isLogin() {
        const loginUser = sessionStorage.getItem(this.customSettings.tokenKey);

        if (loginUser === null || loginUser === undefined) {
            this.router.navigateByUrl(this.customSettings.loginRoute);
            this.login.isLoginIn = false;
        } else {
            this.login.isLoginIn = true;
        }

        return this.login.isLoginIn;
    }
}

