import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    console.log(this.loginService.isLoginIn);
    if (sessionStorage.getItem(environment.tokenKey) != null) {
      this.router.navigateByUrl(environment.defaultChildRouter);
    }
  }

  loginIn(): void {
    for (const i in this.validateForm.controls) {
      if (i != null) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    this.loginService.loginIn(this.validateForm.value).subscribe(resultData => {
      if (resultData.data !== '' && resultData.data !== null) {
        console.log(resultData);
        sessionStorage.setItem(environment.tokenKey, resultData.token);
      }

      this.router.navigateByUrl(environment.defaultChildRouter);
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      loginName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
