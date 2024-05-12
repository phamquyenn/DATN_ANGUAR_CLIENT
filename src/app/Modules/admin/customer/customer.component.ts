import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/admin/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  Title:any;
  p: number=1;
  customer: any[] = []; 
  pageSize: number = 10;

  constructor(private cust:CustomerService){}

  ngOnInit(): void {
    this.Title=" Danh sách khách hàng";
    this.view();
  }
  view(){
    this.cust.getall().subscribe((res: any)=>{
      this.customer = res;
    });
  }
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
        this.cust.delete(id).subscribe(res => {
          this.view();
        });
      } else {
        // User clicked "Hủy" or closed the dialog
        console.log('Xóa khách hàng đã bị hủy bởi người dùng.');
      }
    });
  }
}
