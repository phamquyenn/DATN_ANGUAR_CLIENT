import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/admin/products.service';
import { OrderService } from 'src/app/services/client/order.service';
import { UserService } from 'src/app/services/client/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  account:any;
  customerId: any;
  customerOrder : any[]=[];
  Image: string = '';
  userInfo: any;

  constructor( private cuts:UserService, private order:OrderService, private image: ProductsService) {}

  ngOnInit(): void {
    let storage =sessionStorage.getItem('userInfo')
    console.log(storage)
    if(storage){
      this.account = JSON.parse(storage);
    }
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
    }
  );
}
  onLogout() {
    sessionStorage.clear();
    location.assign('/client/Home'); 
  }
}
