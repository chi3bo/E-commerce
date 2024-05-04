import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/cart-data';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _ToastrService: ToastrService, private _CartService: CartService) { }
  whishItems: Product[] = []
  wishCount: number = 0
  loadingFlag: boolean = false
  noItems:boolean = false



  addItemToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartCount.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
        this.removeItem(id)
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  removeItem(id: any) {
    this.loadingFlag = true
    this._CartService.deleteWishItem(id).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this._ProductsService.getAllWish().subscribe({
            next: (response) => {
              console.log(response);
              this.wishCount = response.count
              this.whishItems = response.data
              this.loadingFlag = false
              if(this.whishItems.length == 0){ this.noItems= true}
              else { this.noItems= false } ;
            },
            error: (err) => {
              console.log(err);
            }
          })

        }

      },
      error: (err) => {
        console.log(err);
        this.loadingFlag = false
      }
    })
  }

  ngOnInit(): void {
    this._ProductsService.getAllWish().subscribe({
      next: (response) => {
        console.log(response);
        this.whishItems = response.data
        this.wishCount = response.count
        if(this.whishItems.length == 0){ this.noItems= true}
        else { this.noItems= false } ;


      },
      error: (err) => {
        console.log(err);
      }
    })
  }





}
