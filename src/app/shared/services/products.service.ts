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

  getAllProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getOneProduct(itemId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${itemId}`)
  }


  addToWish(id: string ): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      { headers: this.getToken() },
    )
  }

  getAllWish(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: this.getToken() })
  }



}
