import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/admin/products.service';
import { FavoritesService } from 'src/app/services/client/favorites.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor( private shop :HomeGetDataService,private Favo:FavoritesService, private user:UserService,private product: HomeGetDataService, private image: ProductsService){ }
  productall: any[]=[];
  category: any[]=[];
  brands: any[]=[];
  carts: any = this.shop.getcarts();
  p: number=1;
  pageSize: number = 10;
  productImage : string= '';
  searchTerm: any;
  searchResults: any[]=[];
  isSearchPerformed: boolean = false;



  ngOnInit(){
    this.allproduct();
    this.shop.getcategories().subscribe(res=>{
      this.category =res;
    })
    this.shop.getbrand().subscribe(res=>{
      this.brands =res;
    })
    this.search()
  }
  allproduct(){
    this.shop.getproductall().subscribe(res=>{
      this.productall =res;
      
    });
  }
  search(): void {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.searchResults = this.productall.filter(product => {
        return product.product_name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    } else {
      if (this.isSearchPerformed) {
        this.searchResults = this.productall; 
      }
    }
  }
  performSearch(): void {
    this.isSearchPerformed = true;
    this.search();
  }
  
  // 
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

    Swal.fire({
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500 // Tắt thông báo sau 1.5 giây
    });
  }
  // 
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
  filterProductsByPrice(event: any) {
    const selectedPrice = event.target.value;
    if (selectedPrice === '10-50') {

        this.shop.getproductall().subscribe((res: any[]) => {
            this.productall = res.filter(product => product.price >= 10 && product.price <= 50);
        });
    } 
    else if(selectedPrice === '60-100'){
      this.shop.getproductall().subscribe((res: any[]) => {
          this.productall = res.filter(product => product.price >= 60 && product.price <= 100);
      });
    } 
  } 
  // Search 

  
  
  

}
