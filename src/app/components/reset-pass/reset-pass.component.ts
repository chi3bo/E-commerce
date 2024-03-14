import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {
  constructor(private _FormBuilder: FormBuilder, private _LoginService: LoginService) { }
  errMessage: any = null
  loading: boolean = false
  resetDone: boolean = false

  resetForm: FormGroup = this._FormBuilder.group({

    email: ["", [Validators.required, Validators.email]],
    newPassword: ["", [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],

  })

  resetpassWord() {
    this.loading = true
    this._LoginService.resetPass(this.resetForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.resetDone = true
        this.loading = false
      },


      error: (err) => {
        this.errMessage = err.error.message
        this.loading = false
        this.resetDone = false
      }
    })
  }

  hideErrMsg() { 
    this.errMessage = null
  }


  // اظهار الerror بتوع الميل و الباس الجديد

  // عمل الفانكشن هنا و في السيرفيس اللي هتعمل ريسيت 

}
