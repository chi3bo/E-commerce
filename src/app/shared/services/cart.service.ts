import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }
  cartCount: BehaviorSubject<any> = new BehaviorSubject(0)



  getToken(): any {
    return { token: localStorage.getItem('userToken') }
  }


  addToCart(itemId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, // baseUrl
      { productId: itemId },                                              // body
      { headers: this.getToken() })                                         // headers
  }


  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: this.getToken() })
  }


  deleteItem(itemId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, { headers: this.getToken() })
  }

  updateCount(itemId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, // base URL
      { count: newCount },                                                                     // body
      { headers: this.getToken() })                                                      // headers
  }

  deleteWishItem(itemId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, { headers: this.getToken() })
  }


  checkOut(cartId: string, myBody: any): Observable<any> {

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://chi3bo.github.io/E-commerce`, // base URL
      myBody,                                                                                                                         // body => DATA
      { headers: this.getToken() }                                                                                                      // headers => token
    )
  }

  getOrders(userId: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }


}
