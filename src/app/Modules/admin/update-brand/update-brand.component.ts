import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/admin/brand.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit{
  Title: any;
  file: any | null = null;
  preview: any | null = null;
  id: string | null = null;
  ImageUrl: string | null = null;
  public Editor = ClassicEditor;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.profileForm = this.fb.group({
      Brand_id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]]

    });
  }

  ngOnInit(): void {
    this.Title = 'Sửa Thương Hiệu';

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.Title = 'Cập Nhật thương hiệu';

        
        this.update.getonceBrand(this.id).subscribe((res) => {
          const brand = res[0];
          this.ImageUrl = brand.brand_image;

          this.getImageUrl(brand.Brand_id);
          this.profileForm.patchValue(brand);
        });
      } else {
        this.Title = 'Thêm Thương Hiệu Mới';
      }
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
    }
  }

  getImageUrl(filename: string): void {
    this.update.getImageUrl(filename).subscribe(
      (imageUrl) => {
        this.preview = imageUrl;
        console.log(this.preview)
        
      },
      (error) => {
        console.error('Lỗi khi lấy ảnh thương hiệu:', error);
      }
    );
  }
  


  onSubmit(){
    if (!this.id) {
      console.error('Thương hiệu không tồn tại.');
      return;
    }

    const brandData = this.profileForm.value;
    const formData = new FormData();
    for (const key in brandData) {
      formData.append(key, brandData[key]);
    }
    formData.append('brand_image', this.file || this.ImageUrl);

    this.update.updateBrand(this.id, formData).subscribe(
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
            this.router.navigate(['admin/brand-admin']);
          });
        } else {
          // Hiển thị SweetAlert lỗi
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
          });
        }
      },
      (error) => {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    
        // Hiển thị SweetAlert lỗi
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
        });
      }
    );
  }

}
