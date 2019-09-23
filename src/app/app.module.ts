import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NzFormModule, NzInputModule, NzButtonModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, CommonModule } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { LoginComponent } from './pages/login/login.component';
import { PawnModule } from './pages/pawn.module';
import { LoginService } from './service/login.service';
import { RequestInterceptor } from './service/request.interceptor';
import { RouterModule } from '@angular/router';
import { AuthGurad } from './auth/auth.gurad';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PawnModule
  ],
  providers: [LoginService, { provide: NZ_I18N, useValue: zh_CN }, AuthGurad, RequestInterceptor
  , { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
