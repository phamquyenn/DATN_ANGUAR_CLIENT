import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/admin/customer.service';
import { ProductsService } from 'src/app/services/admin/products.service';
import { OrderService } from 'src/app/services/client/order.service';
import { UserService } from 'src/app/services/client/user.service';
import Swal from 'sweetalert2';

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
  id: string | null = null;


  profileForm: FormGroup;


  constructor( 
    private cuts:UserService,
    private order:OrderService,
    private fb: FormBuilder,
    private router: Router,
    private update: CustomerService,
    private image: ProductsService) 
  {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    let storage =sessionStorage.getItem('userInfo')
    // console.log(storage)
    if(storage){
      this.account = JSON.parse(storage);
    }
    this.userInfo = this.cuts.getAccountInfo();
    if (this.userInfo) {
      this.customerId = this.userInfo.customer_id; 
      // console.log('đây là id khách hàng',this.customerId)
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
  onSubmit() {
    if (!this.customerId) {
      console.error('Khách hàng không tồn tại.');
      
      return;
    }
    console.log('đây là id trong onsubmit',this.customerId )
    const CustomerData = this.profileForm.value;
    console.log(CustomerData);
    const formData = new FormData();

    for (const key in CustomerData) {
      formData.append(key, CustomerData[key]);
    }

    this.update.update(this.customerId, formData).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          // Hiển thị SweetAlert thành công
          Swal.fire({
            icon: 'success',
            title: 'Sửa thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/customer']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Đã xảy ra lỗi khi cập nhật khách hàng.',
          });
        }
      },
      (error) => {
        console.error('Lỗi khi cập nhật khách hàng:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi cập nhật khách hàng.',
        });
      }
    );
  }
}
