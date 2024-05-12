import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  id: any;
  productdetails: any;
  carts: any = this.dataService.getcarts();
  productImage: string = '';
  quantity: number = 1; 

  constructor(private dataService: HomeGetDataService, private active: ActivatedRoute, private product: HomeGetDataService, private image: ProductsService) { }

  ngOnInit() {
    this.id = this.active.paramMap.subscribe((query: any) => {
      this.id = query.get('id');
      this.dataService.getProductById(this.id).subscribe((res: any) => {
        this.productdetails = res[0];
      })
    })
    
  }

  loadProductImage(filename: any) {
    this.image.getProductImage(filename).subscribe(
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

  onQuantityChange(event: any) {
    this.quantity = event.target.value;
  }

  onAddToCart(productdetails: any) {
    let idx = this.carts.findIndex((item: any) => item.id == productdetails.product_id);
    if (idx >= 0) {
      // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
      this.carts[idx].quantity += this.quantity;
    } else {
      // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
      let cartItem: any = {
        id: productdetails.product_id,
        img: productdetails.product_image,
        name: productdetails.product_name,
        price: productdetails.price,
        quantity: this.quantity,
        subtotal: function () {
          return this.price * this.quantity;
        }
      };
      this.carts.push(cartItem);
    }
    this.product.saveCart(this.carts);
    Swal.fire({
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500 
    });
  }
}
