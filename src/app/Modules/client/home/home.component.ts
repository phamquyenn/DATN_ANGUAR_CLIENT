import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/admin/products.service';
import { FavoritesService } from 'src/app/services/client/favorites.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';
import Swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  

  constructor(private Favo:FavoritesService ,private product: HomeGetDataService, private user:UserService) { }
  products: any[] = [];
  brand: any[] = [];
  blog: any[] = [];
  bestsale : any[] = [];
  carts: any = this.product.getcarts();
  islogin : boolean =false;
  

  
  customOptions: OwlOptions = {
    loop: true,
    items:4,
    margin: 10,
    autoplay: true,
    center:true,
    dots: false,
    navSpeed: 700,
  };
  
  customSliderOptions: any = {
    loop: true,
    items:1,
    center:true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },

    }
  };

  productImage: string = '';

  ngOnInit() {
    this.islogin = this.user.getAccountInfo() ? true :false;

    this.product.getnew().subscribe(res => {
      this.products = res[0];
      
    });

    this.product.getbrand().subscribe(res => {
      this.brand = res;
    });

    this.product.getblog().subscribe(res => {
      this.blog = res;
    });
    this.product.getbestsale().subscribe(res =>{
      this.bestsale =res[0]

    })
  }
  // 
  loadProductImage(filename: any) {
    this.product.getbrandImageUrl(filename).subscribe(
      (response: any) => {
        this.productImage = response.filename;
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  getImageUrl(filename: string): string {
    return `http://localhost:3000/brand/getimage/${filename}`;
    
  }
  // yêu thích
  onFavorites(product_id: any){
    let customer_id = this.user.getAccountInfo().customer_id;
    this.Favo.addFavorites({customer_id:customer_id, product_id:product_id}).subscribe((res: any)=>{
      Swal.fire({
        title:res.result,
        icon: 'success'
      })
    })
  }

  // thêm vào sản phẩm 
  onAddTocart(productdetails: any) {
    let idx = this.carts.findIndex((item: any) => item.id == productdetails.product_id);

    if (idx >= 0) {
      // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
      this.carts[idx].quantity += 1;
    } else {
      // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
      let cartItem: any = {
        id: productdetails.product_id,
        img: productdetails.product_image,
        name: productdetails.product_name,
        price: productdetails.price,
        quantity: 1,
        subtotal: function () {
          return this.price * this.quantity;
        }
      };
      this.carts.push(cartItem);
    }

    this.product.saveCart(this.carts);
    this.product.updateCartAndItemCount(this.carts);

    Swal.fire({
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500 // Tắt thông báo sau 1.5 giây
    });
  }
}
