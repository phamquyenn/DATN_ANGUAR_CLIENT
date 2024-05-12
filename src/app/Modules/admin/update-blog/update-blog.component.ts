import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/admin/blog.service';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  Title: any;
  file: any | null = null;
  preview: any | null = null;
  id: string | null = null;
  blogImage: string = '';
  public Editor = ClassicEditor;

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.profileForm = this.fb.group({
      id: [''],
      title: [''],
      content: [''],
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
        this.update.getonceBlog(this.id).subscribe((res) => {
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
    this.update.getImageUrl(productImage).subscribe(
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
      console.error('Product ID is not available.');
      return;
    }

    const BlogData = this.profileForm.value;
    const formData = new FormData();
    for (const key in BlogData) {
      formData.append(key, BlogData[key]);
    }
    formData.append('image_url', this.file);

    this.update.updateBlog(this.id, formData).subscribe(
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
  // 
  

}
