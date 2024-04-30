import { Component, OnInit } from '@angular/core';
import { oneProduct } from 'src/app/shared/interfaces/one-product';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from './../../shared/services/products.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService , private _ProductsService:ProductsService , private _CartService:CartService , private _ToastrService:ToastrService) { }

  barndsList: any[] = []
  productsList:oneProduct[] = []
  brandName:string =''
  whishList: oneProduct[] = []
  wishIdes: string[] = []
  removeMsg:string = 'Product removed from your wishlist'
  noItems:boolean = false


  ngOnInit(): void {
    this._CategoriesService.getbrands().subscribe({

      next: (response) => {
        this.barndsList = response.data
        console.log(this.barndsList);
      },

      error: (err) => {
        console.log(err);
      }

    })

  }


  displayitems(id:any , name:string , productsSection:HTMLElement){
    this._ProductsService.getAllProducts(40,1,`brand=${id}`).subscribe({
      next:(response)=>{
        this.productsList= response.data;
        if(this.productsList.length==0){ this.noItems = true }
        else{this.noItems = false};
        this.brandName = name
        setTimeout(() => { scrollTo(0, productsSection.offsetTop) }, 400);
        console.log( response);
      },
      error:(err)=>{console.log(err);
      }
    })
    this._ProductsService.getAllWish().subscribe({
      next: (response) => {
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

  addItemToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartCount.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
        console.log(response);
      },
      error: (err) => { console.log(err) }

    })
  }

  addToWishlist(productId: any, heart: HTMLElement, myIcon: HTMLElement) {
    // make sure that wishList inclued this item or not..

    if (this.wishIdes.includes(productId)) {
      this._ProductsService.removeFromWish(productId).subscribe({
        next: (response) => {
          this.wishIdes = response.data
          heart.classList.remove('icon-active')
          heart.classList.add('icon-muted')
          this._ToastrService.info(this.removeMsg, '', { progressBar: true })

        },
        error: (response) => {
          console.log(response);

        }
      })
    }
    else {
      this._ProductsService.addToWish(productId).subscribe({
        next: (response) => {
          this.wishIdes = response.data
          heart.classList.add('icon-active')
          heart.classList.remove('icon-muted')
          this._ToastrService.success(response.message, '', { progressBar: true })
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  scrollTop():void{
    scrollTo( 0 , 0)
  }




}
