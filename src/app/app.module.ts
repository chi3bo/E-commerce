import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {  RouterModule} from '@angular/router';
import { TopSliderComponent } from './components/top-slider/top-slider.component';
import { MiddleSliderComponent } from './components/middle-slider/middle-slider.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchingPipe } from './shared/searching.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    AuthComponent,
    MainComponent,
    AuthNavComponent,
    MainNavComponent,
    FooterComponent,
    TopSliderComponent,
    MiddleSliderComponent,
    SearchingPipe,
    CheckOutComponent,
    NotFoundComponent,
    AllOrdersComponent,
    WishListComponent,
    ForgetPassComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
