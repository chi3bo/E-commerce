import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder: FormBuilder, private _LoginService: LoginService, private _Router: Router) { }

  falseAccount: boolean = false
  spinner: boolean = false
  errorMsg: string = ''

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, ]],
  })


  submitLogin() {


    if (this.loginForm.valid) {
      this.spinner = true
      this._LoginService.setLogin(this.loginForm.value).subscribe({

        next: (response) => {
          this.spinner = false;
          this.falseAccount = false; // اخفاء تنبيه الحساب الخاطئ
          console.log(response, 'done');

          if (response.message == "success") {
            localStorage.setItem('userToken', response.token)
            this._Router.navigate(['home'])

          }
        },


        error: (response) => {
          this.spinner = false;
          this.errorMsg = response.error.message
          this.falseAccount = true;
        },


      })

    }

  }


  hideErrMsg() {
    this.falseAccount = false
  }
}
