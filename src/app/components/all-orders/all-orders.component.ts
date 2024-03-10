import { Component, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { order } from 'src/app/shared/interfaces/order';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  constructor(private _CartService: CartService) { }

  myToken: any = ''
  userData: any = {}
  myOrders: order[] = []


  ngOnInit(): void {
    this.myToken = localStorage.getItem('userToken')
    this.userData = jwtDecode(this.myToken)

    this._CartService.getOrders(this.userData.id).subscribe({
      next: (response) => {
        console.log(response);
        this.myOrders = response
      },

      error: (err) => {
        console.log(err);
      },

    })
  }


  // next >>>  display all orders in html 


}
