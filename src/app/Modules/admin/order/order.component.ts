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
  showConfirmOrder: boolean=true;
  showCancelOrder: boolean =false;

  constructor( private all:OrderService){
    
  }
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(): void {
   
    this.all.getOrders().subscribe(
      (orders) => {
        this.allorder = orders; 
      },
      (error) => {
        console.error('Lỗi khi tải đơn hàng:', error);
      }
    );
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }

  confirmOrder(orderId: string): void {
    this.all.updateOrderStatus(orderId).subscribe(
      () => {
        const orderToUpdate = this.allorder.find(order => order.id === orderId);
        if (orderToUpdate) {
          orderToUpdate.order_status = 'Đã xác nhận';
          this.showConfirmOrder = false; 
          this.showCancelOrder = true;
        }
        Swal.fire({
          icon: 'success',
          title: 'Đã xác nhận đơn hàng',
          text: 'Đơn hàng đã được xác nhận thành công!',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Lỗi khi xác nhận đơn hàng:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi xác nhận đơn hàng!',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  cancelOrder(orderId: string): void {
    this.all.cancelOrderStatus(orderId).subscribe(
      () => {
        const orderToUpdate = this.allorder.find(order => order.id === orderId);
        if (orderToUpdate) {
          orderToUpdate.order_status = 'Đã hủy xác nhận';
          this.showCancelOrder = false; 
          this.showConfirmOrder = true; 
         
        }
        console.log('Đã cập nhật trạng thái đơn hàng thành công!');
       
        Swal.fire({
          icon: 'success',
          title: 'Đã hủy xác nhận đơn hàng',
          text: 'Đơn hàng đã được hủy xác nhận!',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        
        console.error('Lỗi khi hủy xác nhận đơn hàng:', error);
        Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Đã xảy ra lỗi khi hủy xác nhận đơn hàng!',
        confirmButtonText: 'OK'
      });
      }
    );
  }

}
