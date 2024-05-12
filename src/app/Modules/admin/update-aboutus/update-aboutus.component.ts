import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutusService } from 'src/app/services/admin/aboutus.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-aboutus',
  templateUrl: './update-aboutus.component.html',
  styleUrls: ['./update-aboutus.component.css']
})
export class UpdateAboutusComponent {
  Title: any;
  file: any | null = null;
  preview: any | null = null;
  id: string | null = null;
  Image :  string = '';
  public Editor = ClassicEditor;

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update: AboutusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private image: AboutusService
  ){
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      

    });
  }

  ngOnInit(): void {
    this.Title = 'Sửa ';

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.Title = 'Cập Nhật';

        this.update.getonce(this.id).subscribe((res) => {
          const Upro = res[0];
         
          this.getImageUrl(Upro.image);

          // Đặt giá trị cho form
          this.profileForm.patchValue(Upro);
        });
      } else {
        this.Title = 'Thêm Mới';
      }
    });
  }
  // 
  

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.preview = e.target.result;
        
      };
      this.file = file;
     
    }
  }

  getImageUrl(Image: any): void {
    this.update.getImageUrl(Image).subscribe(
      (imageUrl) => {
        this.preview = imageUrl;
      },
      (error) => {
        console.error('không lấy được ảnh:', error);
      }
    );
  }
  onSubmit(){
    if (!this.id) {
      console.error(' không tồn tại.');
      return;
    }

    const Data = this.profileForm.value;
    const formData = new FormData();
    for (const key in Data) {
      formData.append(key, Data[key]);
    }
    formData.append('image', this.file);

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
            this.router.navigate(['admin/About-us']);
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
