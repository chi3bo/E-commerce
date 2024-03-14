import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { oneProduct } from 'src/app/shared/interfaces/one-product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _CartService: CartService, private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute ,private _ToastrService:ToastrService) { }

  itemId: any = ''
  theProduct:oneProduct = {} as oneProduct

  ngOnInit(): void {

    // get id from path (active route)
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.itemId = params.get('itemId') , 

        this._ProductsService.getOneProduct(this.itemId).subscribe({
          next: (response) => {
            this.theProduct = response.data
            console.log(this.theProduct);
    
          },
    
          error: (response) => { console.log(response) }
        })

        
      },

      error: (x) => { console.log('err', x) }
    })

    // get item details by send item id to service 



  }


  addItemToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)

      } , 
    
      error:(err)=>{console.log(err);
      }
    })
    }


}
