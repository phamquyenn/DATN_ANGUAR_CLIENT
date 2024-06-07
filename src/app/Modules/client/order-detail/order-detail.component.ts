import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/admin/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  listorder: any []=[];
  p: number=1;
  customerID: any;
  orderDate: any;

  constructor(private route: ActivatedRoute, private order: OrderService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log('đây là link',params)
      this.customerID = params.get('id');
      this.orderDate = params.get('order_date');
      console.log('đây là:',this.customerID,this.orderDate)

      if (this.customerID && this.orderDate) {
        this.order.getCustomerOrders(this.customerID, this.orderDate).subscribe((res: any) => {
          this.listorder = res;
          console.log('đây là data:',res)
        });
      } 
    });
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }

}
