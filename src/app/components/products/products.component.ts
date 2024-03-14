import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { oneProduct } from 'src/app/shared/interfaces/one-product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService) { }

  productsList: oneProduct[] = []
  whishList: oneProduct[] = []
  wishIdes: string[] = []
  searchValue: string = ''

  addItemToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
      },

      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnInit(): void {

    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.productsList = response.data
        console.log(response);
      },
      error: (response) => {
        console.log(response.data);
      }
    })

    this._ProductsService.getAllWish().subscribe({
      next: (response) => {
        console.log('wish', response);
        this.whishList = response.data

        for (const item of this.whishList) {
          this.wishIdes.push(item._id)
        }
      },


      error: (err) => {
        console.log(err);
      }
    })





  }

  addToWishlist(productId: any , heart:HTMLElement) {

    this._ProductsService.addToWish(productId).subscribe({
      next: (response) => {
        console.log(response);
        heart.classList.add('icon-active')
        this._ToastrService.success( response.message )
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
