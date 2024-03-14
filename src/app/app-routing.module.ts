import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './components/details/details.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { mainguardGuard } from './shared/Guards/mainguard.guard';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';

const routes: Routes = [

  {
    path: '', component: MainComponent, canActivate: [mainguardGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'cart' },
      { path: 'details/:itemId', component: DetailsComponent, title: 'details' },
      { path: 'products', component: ProductsComponent, title: 'products' },
      { path: 'categories', component: CategoriesComponent, title: 'categories' },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      { path: 'check-out/:cartId', component: CheckOutComponent, title: 'check out' },
      { path: 'allorders', component: AllOrdersComponent, title: 'All orders' },
      { path: 'wish-list', component: WishListComponent, title: 'wish List' },
    ]
  },

  {
    path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: 'Forget-Pass', component: ForgetPassComponent, title: 'Forget Password' },
      { path:'reset-pass' , component:ResetPassComponent , title : 'reset password'},
      { path: '**', component: NotFoundComponent ,title:'Not found !' },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
