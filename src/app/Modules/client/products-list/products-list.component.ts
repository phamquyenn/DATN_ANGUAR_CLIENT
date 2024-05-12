import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import Swal from 'sweetalert2';


import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';
import { FavoritesService } from 'src/app/services/client/favorites.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  id: any;
  productall: any[] = [];
  category: any[] = [];
  brands: any[] = [];
  carts: any = this.dataService.getcarts();
  p: number=1;
  pageSize: number = 10;
  productImage : string= '';

  constructor(private active: ActivatedRoute,private Favo:FavoritesService, private user:UserService,private dataService: HomeGetDataService,private image: ProductsService) { }

  ngOnInit(): void {
    this.dataService.getproductall().subscribe(res=>{
      
      this.productall =res;
      console.log(this.productall)
    })
    this.dataService.getcategories().subscribe(res => {
      this.category = res;
    });

    this.dataService.getbrand().subscribe(res => {
      this.brands = res;
      console.log(this.brands);
    });

    this.id = this.active.paramMap.subscribe((query: any ) =>{
      this.id =query.get('id');

      this.dataService.getproductsbycategoriesID(this.id).subscribe(res => {
        this.productall = res;
        
      });
    })
  }
  loadProductImage(filename: any) {
    this.image.getProductImage(filename).subscribe(
      (response: any) => {
        this.productImage = response.filename;
        console.log(this.productImage)
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  onFavorites(product_id: any){
    let customer_id = this.user.getAccountInfo().customer_id;
    this.Favo.addFavorites({customer_id:customer_id, product_id:product_id}).subscribe((res: any)=>{
      Swal.fire({
        title:res.result,
        icon: 'success'
      })
    })
  }
  // 
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

    this.dataService.saveCart(this.carts);

    Swal.fire({
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500 // Tắt thông báo sau 1.5 giây
    });
  }
}
