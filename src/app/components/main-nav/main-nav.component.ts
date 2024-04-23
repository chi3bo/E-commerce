import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { LogOutService } from 'src/app/shared/services/log-out.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  constructor(private _Router: Router, private _LogOutService: LogOutService, private _CartService: CartService) { }
  cartNumber: any = 0

  setLogout(): void {
    this._LogOutService.Logout()
  }


  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this._CartService.cartCount.next(response.numOfCartItems)
      }
      ,
      error: (err) => { console.log(err); }
    })


    this._CartService.cartCount.subscribe({
      next: (response) => {
        this.cartNumber = response
      }
      ,
      error: (err) => { console.log(err); }
    })


  }

}