import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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



  removeItem(itemId: string) {
    this._CartService.deleteItem(itemId).subscribe({
      next: (response) => {
        this.theCart = response
        this.cartItems = response.data.products
        console.log(response);
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
        console.log(this.cartItems.length);


      },


      error: (err) => {
        console.log(err);
      }
    })
  }


}
