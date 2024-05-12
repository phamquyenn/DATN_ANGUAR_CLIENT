import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/admin/customer.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  Title: string = 'Sửa thông tin khách hàng';
  id: string | null = null;
  public Editor = ClassicEditor;


  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.Title = 'Cập Nhật Khách Hàng';

        this.update.getonce(this.id).subscribe((res) => {
          const list = res[0];

          if (list) {
            this.profileForm.patchValue(list);
          } else {
            console.error('Không tìm thấy khách hàng.');
          }
        });
      }
    });
  }

  onSubmit() {
    if (!this.id) {
      console.error('Khách hàng không tồn tại.');
      return;
    }

    const CustomerData = this.profileForm.value;
    console.log(CustomerData);
    const formData = new FormData();

    for (const key in CustomerData) {
      formData.append(key, CustomerData[key]);
    }

    this.update.update(this.id, formData).subscribe(
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

        // Hiển thị SweetAlert lỗi
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi cập nhật khách hàng.',
        });
      }
    );
  }
}
