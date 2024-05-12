import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import { FavoritesService } from 'src/app/services/client/favorites.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  id: any;
  productall: any[] = [];
  category: any[] = [];
  brands: any[] = [];
  carts: any = this.dataService.getcarts();
  p: number=1;
  pageSize: number = 10;
  productImage : string= '';
  Favorites: any[] =[];

  constructor(private active: ActivatedRoute,private dataService: HomeGetDataService, private favo: FavoritesService,private image: ProductsService, private user:UserService) { }

  ngOnInit(): void {
    
    this.view();
    this.dataService.getcategories().subscribe(res => {
      this.category = res;
    });

    this.dataService.getbrand().subscribe(res => {
      this.brands = res;
      
    });

    this.id = this.active.paramMap.subscribe((query: any ) =>{
      this.id =query.get('id');

      this.dataService.getproductsbycategoriesID(this.id).subscribe(res => {
        this.productall = res;
        
      });
    })
  }
  view(){
    this.favo.getFavorites(this.user.getAccountInfo().customer_id).subscribe(res=>{
    
      this.Favorites =res;
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
  // 
  filterProductsByPrice(event: any) {
    const selectedPrice = event.target.value;
    if (selectedPrice === '10-50') {

        this.favo.getFavorites(this.user.getAccountInfo().customer_id).subscribe((res: any[]) => {
            this.productall = res.filter(product => product.price >= 10 && product.price <= 50);
        });
    } 
    else if(selectedPrice === '60-100'){
      this.favo.getFavorites(this.user.getAccountInfo().customer_id).subscribe((res: any[]) => {
          this.productall = res.filter(product => product.price >= 60 && product.price <= 100);
      });
    } 
  } 

  // xóa sản phẩm yêu thích
  onDelete(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa khách hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Đồng ý"
        this.favo.delete(id).subscribe(res => {
          this.view();
        });
      } else {
        // User clicked "Hủy" or closed the dialog
        console.log('Xóa khách hàng đã bị hủy bởi người dùng.');
      }
    });
  }

  // Thêm vào giỏ hàng
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
