import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any = [];
  cartImage: string = '';
  userInfo: any;

  constructor(private app: HomeGetDataService, private router: Router, private image: ProductsService, private user:UserService) {}

  ngOnInit(): void {
    this.carts = this.app.getcarts();
    // console.log(this.carts);
    //  console.log(this.totalQuantity)
 
  }

  // Lấy tổng số lượng
  get totalQuantity(): number {
    return this.app.getCartToTalQuantity();
  }

  // Tổng tiền của sản phẩm có trong giỏ hàng
  get totalPrice(): number {
    return this.app.getCartToTalPrice();
  }

  // Tổng tiền của mỗi sản phẩm
  subtotal(cart: any): number {
    return cart.quantity * cart.price;
  }


  updateQuantity(idx: number, ev: any) {
    let newQuantity = ev.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    ev.target.value = newQuantity;
    this.carts[idx].quantity = ev.target.value;
    this.app.saveCart(this.carts);
  }

  removecart(idx: number) {
    if (confirm('Bạn có chắc muốn xóa không?')) {
      this.carts.splice(idx, 1);
      this.app.saveCart(this.carts);
      this.router.navigate(['client/cart']);
    }
  }

  // Lấy đường dẫn hình ảnh sản phẩm
  loadProductImage(filename: any) {
    this.image.getProductImage(filename).subscribe(
      (response: any) => {
        this.cartImage = response.filename;
        console.log(this.cartImage);
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
  }

  // Kiểm tra thông tin giỏ hàng và chuyển hướng đến trang thanh toán
  checkout() {
    let storage = sessionStorage.getItem('userInfo');
    if (storage) {
      this.userInfo = JSON.parse(storage);
    } else {
      this.router.navigate(['client/login']);
      return; 
    }
    this.router.navigate(['client/checkout'], { state: { carts: this.carts } });
}
}
