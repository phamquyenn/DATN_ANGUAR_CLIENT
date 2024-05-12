import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { BlogComponent } from './blog/blog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashbroadComponent } from '../admin/dashbroad/dashbroad.component';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuardService } from 'src/app/services/admin/auth-gaurd.service';
import { PaymentComponent } from './payment/payment.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SuccessComponent } from './success/success.component';
import { OrderedComponent } from './ordered/ordered.component';

const routes: Routes = [
  {
    path:'Home',
    component:HomeComponent,
    title:'Trang Chủ'
  },
  {
    path:'shop',
    component:ShopComponent,
    title:'Cửa hàng'
  },
  {
    path:'blog',
    component:BlogComponent,
    title:'Tin tức'
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    title:'Thanh Toán'
  },
  {
    path:'cart',
    component:CartComponent,
    title:'Giỏ Hàng'
  },
  {
    path:'page-not-found',
    component:PageNotFoundComponent,
    title:'Không tìm thấy'
  },
  {
    path:'categories/:id',
    component:ProductsListComponent,
    title:'sản phẩm'
  },
  {
    path:'productDetail/:id',
    component:ProductDetailComponent,
    title:'Chi tiết'
  },
  {
    path:'productDetail',
    component:ProductDetailComponent,
    title:'Chi tiết sản phẩm'
  },
  {
    path:'login',
    component:LoginComponent,
    title:'Đăng nhập'
  },
  {
    path:'register',
    component:RegisterComponent,
    title:'Đăng ký'
  },
  {
    path:'account',
    component:AccountComponent,
    title:'Tài khoản'
  },
  
  {
    path:'contact',
    component:ContactComponent,
    title:'liên hệ'
  },
  {
    path:'payment',
    component:PaymentComponent,
    title:'payment'
  },
  {
    path:'favorites',
    component:FavoritesComponent,
    title:'Sản phẩm yêu thihcs'
  },
  {
    path:'aboutus',
    component:AboutUsComponent,
    title:'Giới thiệu'
  },
  {
    path:'success',
    component:SuccessComponent,
    title:'Đã mua .'
  },
  {
    path:'order',
    component:OrderedComponent,
    title:'Đơn hàng.'
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
