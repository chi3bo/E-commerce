import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }

  checkFlag: boolean = false
  formData: any = {
    shippingAddress: {}
  }
  myCartId: any = ''

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.myCartId = params.get('cartId')
      },
    })
  }

  checkOutForm: FormGroup = this._FormBuilder.group({
    details: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required, Validators.minLength(3)]]
  })

  checkOut() {
    this.formData.shippingAddress = this.checkOutForm.value
    this.checkFlag = true
    this._CartService.checkOut(this.myCartId, this.formData).subscribe({
      next: (response) => {
        if (response.status == "success") {
          window.open(response.session.url, '_self')
          this.checkFlag = false
        }
      },


      error: (err) => {
        console.log(err);
        this.checkFlag = false
      }
    })


  }

}
