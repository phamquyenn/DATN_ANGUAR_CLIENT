import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/admin/customer.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  Title: any;
  public Editor = ClassicEditor;


  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private customer: CustomerService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.customer.add(this.profileForm.value).subscribe((res: any) => {
      if (res) {
        // Hiển thị SweetAlert2 thành công
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['admin/customer']);
        });
      } else {
        // Hiển thị SweetAlert2 lỗi
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi thêm sản phẩm.',
        });
      }
    });
  }
}
