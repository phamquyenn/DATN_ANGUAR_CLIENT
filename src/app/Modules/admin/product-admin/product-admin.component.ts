import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
    
    Title:any;
    products: any;
    p: number=1;
    items: any[] = []; 
    pageSize: number = 10;
    productImage: string = '';
    

    constructor(private product:ProductsService){ }

    ngOnInit(){

      this.getallproduct();
    }
    // list 
    getallproduct(){
      this.Title ="Danh Sách Sản Phẩm "

      this.product.getproductall().subscribe((res: any)=>{
      
        this.items = res;
        console.log(this.items)
        
      })
    }
    // 
    loadProductImage(filename: any) {
      this.product.getProductImage(filename).subscribe(
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
    // DELETE
    onDelete(product_id: number) {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked "Đồng ý"
          this.product.deleteproduct(product_id).subscribe(res => {
            this.getallproduct();
          });
        } else {
          // User clicked "Hủy" or closed the dialog
          console.log('Xóa sản phẩm đã bị hủy bởi người dùng.');
        }
      });
    }
  
}
