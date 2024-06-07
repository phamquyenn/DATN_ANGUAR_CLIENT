import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/admin/brand.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  Title: any;
  file: any;
  preview: any;
  public Editor = ClassicEditor;


  profileFrom =  new FormGroup({
    name  : new FormControl(''),
    address : new FormControl(''),
    phone : new FormControl(''),
    email : new FormControl(''),
  })

  constructor( private add:BrandService, private fb: FormBuilder, private router: Router){

  }
  ngOnInit(): void {
    this.Title =" Thêm Thương Hiệu "
  }

  // ngAfterViewInit(): void {
  //   ClassicEditor.create(document.querySelector('#editor'), {
  //     plugins: [CKFinder],
  //     toolbar: ['ckfinder', '|', 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo']
  //   });
  // }
  // 
  onFileChange(event: any) {
    this.file = event.target.files[0];
    const reader= new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload = (e: any)=>{
      this.preview = e.target.result;
    }
    console.log(this.file.name)
  }
  // 
  getImageUrl(BrandImage: string): void {
    this.add.getImageUrl(BrandImage)
      .subscribe(
        imageUrl => {
          // Thực hiện xử lý khi nhận được URL hình ảnh
          this.preview = imageUrl;
        },
        error => {
          // Xử lý lỗi nếu có
          console.error('Error getting image URL:', error);
        }
      );
  }
  onSubmit() {

    console.log(this.profileFrom.value)
    let name:any = this.profileFrom.value.name;
    let address:any = this.profileFrom.value.address;
    let phone:any = this.profileFrom.value.phone;
    let email:any = this.profileFrom.value.email;


    const formData = new FormData();
    formData.append("name", name);  
    formData.append("address", address);  
    formData.append("phone", phone);  
    formData.append("email", email);  
    formData.append("brand_image", this.file, this.file.name);  


    this.add.addBrand(formData).subscribe(data => {
      console.log(data);
      if (data) {
        // Hiển thị SweetAlert2 thành công
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/admin/brand-admin']);
        });
      } else {
        // Hiển thị SweetAlert2 lỗi
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi thêm thương hiệu.',
        });
      }
    });
  }

}
