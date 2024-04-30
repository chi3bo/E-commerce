import { Component, HostListener, OnInit } from '@angular/core';
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
  removeMsg: string = 'Product removed from your wishlist'




  addItemToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartCount.next(response.numOfCartItems)
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
        this.pageMax = response.metadata.limit
        this.theCurrentPage = response.metadata.currentPage
        this.nextP = response.metadata.nextPage
        this.total = response.results
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

  // ===== start pagination ====
  pageMax: number = 0
  theCurrentPage: number = 0
  nextP: number = 0
  total: number = 0
  pageChanged(event: any): void {
    this._ProductsService.getAllProducts(16, event).subscribe({
      next: (response) => {
        this.productsList = response.data
        this.pageMax = response.metadata.limit
        this.theCurrentPage = response.metadata.currentPage
        this.nextP = response.metadata.nextPage
        this.total = response.results
        console.log(response);
      },
      error: (response) => {
        console.log(response.data);
      }
    })
  }
  goUp(section: HTMLElement): void {
    scrollTo(0, section.offsetTop - 100)
  }
  // ===== pagination ====





}
