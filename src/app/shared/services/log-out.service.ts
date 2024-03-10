import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(private _Router:Router) { }

  Logout(): void {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
  }
}
