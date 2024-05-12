import {NgModule} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ClientRoutingModule } from './client-routing.module';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { BlogComponent } from './blog/blog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { PaymentComponent } from './payment/payment.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutUsComponent } from './about-us/about-us.component';
import { SuccessComponent } from './success/success.component';
import { OrderedComponent } from './ordered/ordered.component';



@NgModule({
    declarations:[
    HomeComponent,
    ShopComponent,
    BlogComponent,
    CheckoutComponent,
    CartComponent,
    PageNotFoundComponent,
    ProductsListComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ContactComponent,
    PaymentComponent,
    FavoritesComponent,
    AboutUsComponent,
    SuccessComponent,
    OrderedComponent,

   
  ],
    imports:[
        ClientRoutingModule,
        CommonModule, 
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        CarouselModule,


    ],

})
export class ClientModule{
 
}