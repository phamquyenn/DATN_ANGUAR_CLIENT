import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VnpayService } from 'src/app/services/client/vnpay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  profileForm: FormGroup = new FormGroup({
    amount: new FormControl(''),
    bankCode: new FormControl(''),
    language: new FormControl('')
  });

  constructor(private payment: VnpayService) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.payment.createPaymentUrl(this.profileForm.value).subscribe(
      (data: any) => {
        console.log(data.vnpUrl);
        if (data && data.vnpUrl) {
          window.location.href = data.vnpUrl;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Đã xảy ra lỗi khi tạo URL thanh toán.',
          });
        }
      },
      (error: any) => {
        console.error('Lỗi:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi tạo URL thanh toán.',
        });
      }
    );
  }

}
