import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/admin/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderID: any;
  orderDate: any;
  details: any
  p: number=1;
  allorder: any[] = [];
  Title: any;
  confirmationStatus: boolean[] = [];
  selectedStatus: any;
  orderId: any;
  status:any;
  statusOptions: string[] = [];
  currentStatus: string = '';

  constructor(private route: ActivatedRoute, private order: OrderService) { }

  ngOnInit(): void {
    this.Title=" Danh sách chi tiết đơn hàng";

    this.route.paramMap.subscribe((params) => {
      this.orderID = params.get('id');
      this.orderDate = params.get('order_date');
      // console.log(this.orderID,this.orderDate)

      if (this.orderID && this.orderDate) {
        this.order.getCustomerOrders(this.orderID, this.orderDate).subscribe((res) => {
          this.details = res;
          // console.log('đây là details',this.details) 
          // console.log( 'đây là id',this.selectedStatus)
        });
        this.order.getStatusOrdersID(this.orderID).subscribe((res)=>{
          this.status =res[0];
          // console.log('đây là status',res[0])

          if (this.status && this.status.order_status) {
            this.currentStatus = this.status.order_status; 

            switch (this.currentStatus) {
              case "Chờ xác nhận":
                this.statusOptions = ["Xác nhận"];
                break;
              case "Xác nhận":
                this.statusOptions = ["Đang vận chuyển"];
                break;
              case "Đang vận chuyển":
                this.statusOptions = ["Đã giao"];
                break;
              default:
                this.statusOptions = [];
                break;
            }
          } 
        })
      } 
      
    });
    

  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
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
  // cập nhật trạng thái đơn hàng
  submitStatusUpdate(): void {
    const orderId = this.details && this.details.id ? this.details.id : this.orderID;
    // console.log(' đây có là id đơn hàng:', orderId)
    if (this.selectedStatus) {
      this.order.updateStatus(orderId, this.selectedStatus).subscribe(
        response => {
          console.log('Cập nhật trạng thái đơn hàng thành công:', response);
          Swal.fire('Thành công', 'Trạng thái đơn hàng đã được cập nhật!', 'success');
        },
        error => {
          console.error('Có lỗi xảy ra:', error);
          Swal.fire('Lỗi', 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng, vui lòng thử lại!', 'error');
        }
      );
    } else {
      Swal.fire('Lỗi', 'Vui lòng chọn trạng thái đơn hàng!', 'error');
    }
  }
}
