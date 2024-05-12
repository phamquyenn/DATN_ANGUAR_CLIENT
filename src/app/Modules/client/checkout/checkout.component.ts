import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';
import { VnpayService } from 'src/app/services/client/vnpay.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  carts: any = [];
  cartImage: string='';
  ship = 5;
  account: any = {};
  profileForm: FormGroup;
  

  constructor( private app: HomeGetDataService,
                private image:ProductsService, 
                private router:Router, 
                private vnpay:VnpayService,
                private formBuilder: FormBuilder
              ){
                this.profileForm = this.formBuilder.group({
                  shippingAddress: ['', Validators.required],
                  method: ['', Validators.required]
                });
              }
  ngOnInit(): void {
    this.ship = 5000;
    // cart
    this.carts = this.app.getcarts();
    // user
    let storage =sessionStorage.getItem('userInfo')
    if(storage){
      this.account = JSON.parse(storage);
    }
    
  }
  
  //Tổng số lượng
  get totalQuantity(): number {
    return this.app.getCartToTalQuantity();
  }
  // Tổng tiền 
  get totalPrice(): number {
    return this.app.getCartToTalPrice();
  }

  // Tổng Tiền
  get totalOrder(): number {
  return this.totalPrice + this.ship;
}
  // Ảnh sản phẩm 
  loadProductImage(filename: any) {
    this.image.getProductImage(filename).subscribe(
      (response: any) => {
        this.cartImage = response.filename;
        console.log(this.cartImage)
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  // Lấy ảnh từ kho ảnh 
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  onSubmit( ) {
    const shippingAddress: any = this.profileForm.value.shippingAddress;
    const method: any  = this.profileForm.value.method;

    const productIds: string[] = [];
    const quantities: number[] = [];
    const price: number[] = [];

  
    for (const cartItem of this.carts) {
      productIds.push(cartItem.id);
      quantities.push(cartItem.quantity);
      price.push(cartItem.price);
    }

    // 
    const paymentData = {
      // amount: this.totalOrder,
      price: price,
      customer_id: this.account.customer_id,
      shipAddress: shippingAddress,

      products_id: productIds, 
      quantity: quantities,

      language: 'vn',
      payment_method: method
    };
   
    this.vnpay.createPaymentUrl(paymentData).subscribe(
      data => {
        window.location.href = data.vnpUrl;
      },
      error => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }
}


