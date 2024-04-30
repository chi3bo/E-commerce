import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }

  getToken(): any {
    return { token: localStorage.getItem('userToken') }
  }

  getAllProducts( itemsPerPage:number = 16 , pageNum:number = 1 , categoryOrBrand:string = ''): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?limit=${itemsPerPage}&page=${pageNum}&${categoryOrBrand}`)
    // return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d58a0049ad0b52b9003f`)
  }

  getOneProduct(itemId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${itemId}`)
  }


  addToWish(productId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: productId },
      { headers: this.getToken() },
    )
  }

  removeFromWish(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: this.getToken() }
    )
  }

  getAllWish(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: this.getToken() })
  }



}
