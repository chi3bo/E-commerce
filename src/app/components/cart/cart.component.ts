import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { cartItem } from 'src/app/shared/interfaces/cart-data';
import { cartData } from 'src/app/shared/interfaces/cart-data';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService: CartService , private _ToastrService:ToastrService) { }


  theCart: cartData = {} as cartData
  cartItems: cartItem[] = []
  TotalPrice:number = 0
  noItems:boolean = false
  errorMsg:boolean = false

  removeItem(itemId: string) {
    this._CartService.deleteItem(itemId).subscribe({
      next: (response) => {
        this.theCart = response
        this.cartItems = response.data.products
        this.TotalPrice = response.data.totalCartPrice
        if (this.cartItems.length == 0){ this.noItems= true }
        else { this.noItems= false };
        this._CartService.cartCount.next(response.numOfCartItems)
        this._ToastrService.info('item removed !')

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editCount(id:string , count:number) {
    if (count > 0) {
      this._CartService.updateCount( id , count).subscribe({
        next: (response) => {
          this.theCart = response
          this.cartItems = response.data.products
          this.TotalPrice = response.data.totalCartPrice
        },
  
        error: (err) => { console.log(err); 
        },
      })
    }



  }

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.theCart = response
        this.cartItems = response.data.products
        this.TotalPrice = response.data.totalCartPrice
        console.log(this.cartItems.length);
        this.errorMsg = false
        if (this.cartItems.length == 0){
           this.noItems= true 
          }
        else { this.noItems= false }
      },

      error: (err) => {
        console.log(err);
        this.errorMsg = true
      }
    })
  }



}
