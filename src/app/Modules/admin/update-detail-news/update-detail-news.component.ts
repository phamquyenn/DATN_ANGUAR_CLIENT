import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from 'src/app/services/admin/blog.service';
import { NewsService } from 'src/app/services/client/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-detail-news',
  templateUrl: './update-detail-news.component.html',
  styleUrls: ['./update-detail-news.component.css']
})
export class UpdateDetailNewsComponent implements OnInit {
  Title: any;
  file: any | null = null;
  preview: any | null = null;
  id: any;
  blogImage: string = '';
  public Editor = ClassicEditor;

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private image:BlogService
  ){
    this.profileForm = this.fb.group({
      id: [''],
      news_title: [''],
      news_content: [''],
      author: [''],
      detail_title: [''],
      detail_content: [''],
      image_url: [''],

    });
  }
  ngOnInit(): void {
    this.Title = 'Sửa tin tức';

    
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.Title = 'Cập Nhật Tin Tức';

        // Lấy thông tin sản phẩm và hiển thị hình ảnh
        this.update.getdetailsbynewID(this.id).subscribe((res) => {
          const Upro = res[0];
          this.getImageUrl(Upro.product_image);

          // Đặt giá trị cho form
          this.profileForm.patchValue(Upro);
        });
      } else {
        this.Title = 'Thêm Tin Tức Mới';
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

  getImageUrl(productImage: string): void {
    this.image.getImageUrl(productImage).subscribe(
      (imageUrl) => {
        this.preview = imageUrl;
      },
      (error) => {
        console.error('Error getting image URL:', error);
      }
    );
  }
  onSubmit(){
    if (!this.id) {
      return;
    }

    const Data = this.profileForm.value;
    const formData = new FormData();
    for (const key in Data) {
      formData.append(key, Data[key]);
    }
    formData.append('image_url', this.file);

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
            this.router.navigate(['admin/blog-admin']);
          });
        } else {
          // Hiển thị SweetAlert lỗi
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Đã xảy ra lỗi khi cập nhật.',
          });
        }
      },
      (error) => {
        console.error('Lỗi khi cập nhật :', error);
    
        // Hiển thị SweetAlert lỗi
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
        });
      }
    );
  }
  // 
}
