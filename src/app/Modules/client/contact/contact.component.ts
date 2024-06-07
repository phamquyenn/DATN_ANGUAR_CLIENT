import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/admin/contact.service';
import { EmailService } from 'src/app/services/admin/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Slide
  customSliderOptions: any = {
    loop: true,
    items:1,
    center:true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
  
    }
  };


  account: any = {};
  carts: any = [];
  profileForm: FormGroup;


constructor( 
  private router: Router,
  private formBuilder: FormBuilder,
  private call:ContactService
){
  this.profileForm = this.formBuilder.group({
    content: ['', Validators.required],
  });
}
  ngOnInit(): void {
    // user
    let storage =sessionStorage.getItem('userInfo')
    if(storage){
      this.account = JSON.parse(storage);
    }
    this.call.getall().subscribe((res:any)=>{
      const all = res;
      console.log(all);
    })
  }
  onSubmit( ) {
    const contented: any = this.profileForm.value.content;

    const Data = {
      Name: this.account.name,
      Email: this.account.email,
      PhoneNumber: this.account.phone,
      Address: this.account.address,
      Content: contented,
    };
   
    this.call.add(Data).subscribe(
      data => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Đã nhận xét.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['client/Home']);
        });
      },
      error => {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Lỗi gửi nhận xét.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }
}
