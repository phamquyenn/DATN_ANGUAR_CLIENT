import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/admin/products.service';
import { OrderService } from 'src/app/services/client/order.service';
import { UserService } from 'src/app/services/client/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.css']
})
export class OrderedComponent implements OnInit {
  customerId: any;
  customerOrder : any[]=[];
  Image: string = '';
  userInfo: any;
  selectedProducts: { [productId: number]: any } = {};
 constructor( private cuts:UserService, private order:OrderService, private image: ProductsService, private router:Router){}

  ngOnInit(): void {
    this.userInfo = this.cuts.getAccountInfo();
    if (this.userInfo) {
      this.customerId = this.userInfo.customer_id; 
      this.getOrderbycustomerId(); 
    } else {
      console.error('Không có thông tin người dùng.');
    }
    
  }
  getOrderbycustomerId(): void{
      this.order.getCustomerOrders(this.userInfo.customer_id).subscribe( (data) =>{
        this.customerOrder = data;
        console.log( this.customerOrder)
      },(error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        // Xử lý lỗi nếu cần thiết
      }
    );
  }
  loadProductImage(filename: any) {
    this.image.getProductImage(filename).subscribe(
      (response: any) => {
        this.Image = response.filename;
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }
 

  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
  }

  handleCheckboxChange(productId: number): void {
   
    if (this.selectedProducts[productId]) {
      delete this.selectedProducts[productId]; 
    } else {
      this.selectedProducts[productId] = true; 
    }
  }
  cancelSelectedOrders(): void {
    const selectedProductIds = Object.keys(this.selectedProducts);
      if (selectedProductIds.length > 0) {
        Swal.fire({
          title: 'Xác nhận',
          text: 'Bạn có chắc chắn muốn hủy đơn hàng đã chọn?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
          if (result.isConfirmed) {
              selectedProductIds.forEach((productId) => {
                  this.order.deleteOrder(parseInt(productId)).subscribe(
                      () => {
                          Swal.fire('Thành công!', 'Đã hủy đơn hàng thành công!', 'success');
                          this.router.navigateByUrl('/client/order', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/client/order']);
                        });
                      },
                      (error) => {
                          console.error('Lỗi khi hủy đơn hàng:', error);
                          // Xử lý lỗi nếu cần thiết
                          Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi hủy đơn hàng!', 'error');
                      }
                  );
              });
          }
      });
    } else {
       
        Swal.fire('Thông báo!', 'Vui lòng chọn ít nhất một đơn hàng để hủy!', 'info');
    }
  } 

  

goToHomePage(): void {
    // Chuyển hướng đến trang chủ
}

}
