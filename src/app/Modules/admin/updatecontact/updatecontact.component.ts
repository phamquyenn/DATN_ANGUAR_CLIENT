import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContactService } from 'src/app/services/admin/contact.service';
import { EmailService } from 'src/app/services/admin/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css']
})
export class UpdatecontactComponent implements OnInit{

  Title: string = 'Phản hồi nhận xét';
  id: any;
  contact: any;
  account: any;
  currentStatus: string = '';

  public Editor = ClassicEditor;

  emailForm: FormGroup;
  

  constructor(
    private call:ContactService,
    // private datePipe: DatePipe,
    private mail:EmailService,
    private router: Router,
    private fb: FormBuilder,
    private active: ActivatedRoute,
  
  ){ 
    this.emailForm = this.fb.group({
    subject: ['STORE 420 PERFUMES ', [Validators.required]],
    Email: ['',[Validators.required]],
    body: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    let storage =sessionStorage.getItem('userInfo')
    if(storage){
      this.account = JSON.parse(storage);
    }

    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.call.getonce(this.id).subscribe((res: any) => {
        this.contact = res[0];
        console.log('contact',this.contact );
        this.emailForm.patchValue({
          Email: this.contact.Email
        });
      })
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      const { Email, subject, body } = this.emailForm.value;
      this.mail.sendEmail(Email, subject, body)
        .subscribe(
          response => {
            this.currentStatus = 'Đã phản hồi';
            console.log('trạng thái sau khi gửi email thành công:', this.currentStatus);

            this.call.updateStatus(this.contact.ID, this.currentStatus)
            .subscribe(
              updatedResponse => {
                console.log('Cập nhật trạng thái thành công:', updatedResponse);
                // Thực hiện các hành động khác sau khi cập nhật trạng thái thành công
                if ('message' in response) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Gửi Email thành công',
                    text: response.message,
                  }).then(() => {
                    this.router.navigate(['/admin/contact']); 
                  });
                } else {
                  console.error('Response không có thuộc tính message:', response);
                }
              },
              error => {
                console.error('Lỗi khi cập nhật trạng thái:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'There was an error!',
                  text: error.message,
                });
              }
            );
          },
          error => {
            console.error('Lỗi khi gửi email:', error);
            Swal.fire({
              icon: 'error',
              title: 'There was an error!',
              text: error.message,
            });
          }
        );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form is not valid',
        text: 'Please fill out all required fields.',
      });
    }
  }
}
