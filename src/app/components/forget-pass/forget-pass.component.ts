import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent {
  constructor(private _FormBuilder: FormBuilder, private _LoginService: LoginService , private _Router:Router) { }
  errmail: any = null
  errcode: any = null
  sentDone: any = null
  codeDone: any = null
  loading: boolean = false


  forgetForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  })

  verifyForm: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required]]
  })

  hideErrMsg() {
    this.errmail = null
    this.errcode = null
  }

  sendEmail() {
    this.loading = true
    this._LoginService.forgetPassword(this.forgetForm.value).subscribe({
      next: (response) => {
        this.sentDone = true
        this.loading = false
      },


      error: (err) => {
        this.errmail = err.error.message
        this.loading = false
      }

    })
  }


  verifyCode() {
    this.loading = true
    this._LoginService.verifycode(this.verifyForm.value).subscribe({
      next: (response) => {

        if (response.status == 'Success') {
          this.sentDone = false
          this.codeDone = true
          this.loading = false
          this._Router.navigate(['/reset-pass'])
        }
      },


      error: (err) => {
        this.errcode = err.error.message
        this.loading = false
      }

    })
  }




}
