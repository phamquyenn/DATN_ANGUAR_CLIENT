import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/admin/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
 allorder: any[] = [];
 p: number=1;
 Title:any;
 confirmationStatus: boolean[] = [];


  constructor( private order:OrderService){
    
  }
  ngOnInit(): void {
    this.Title=" Danh sách đơn hàng";
    this.loadOrders();
  }
  loadOrders(): void {
   
    this.order.getOrders().subscribe(
      (orders) => {
        this.allorder = orders; 
        console.log( this.allorder)
      },
      (error) => {
        console.error('Lỗi khi tải đơn hàng:', error);
      }
    );
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  // Xác nhận đơn hàng
  confirmOrder(orderId: number, index: number): void {
    this.order.updateOrderStatus(orderId).subscribe(response => {
      this.allorder[index].order_status = 'Đã xác nhận';
      this.confirmationStatus[index] = true; 
    }, error => {
      console.error('Lỗi xác nhận đơn hàng', error);
    });
  }
  // Hủy xác nhận
  cancelConfirmation(orderId: number, index: number): void {
    this.order.cancelOrderStatus(orderId).subscribe(
      response => {
        this.allorder[index].order_status = 'Chưa xác nhận';
        this.confirmationStatus[index] = false;
        Swal.fire('Thành công', 'Đơn hàng đã được hủy xác nhận thành công!', 'success');
      },
      error => {
        console.error('Lỗi hủy xác nhận đơn hàng', error);
        Swal.fire('Lỗi', 'Có lỗi xảy ra khi hủy xác nhận đơn hàng, vui lòng thử lại!', 'error');
      }
    );
  }
  
}
