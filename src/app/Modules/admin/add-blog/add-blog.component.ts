import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/admin/blog.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  Title: any;
  file: any;
  preview: any;
  public Editor = ClassicEditor;


  profileFrom =  new FormGroup({
    title : new FormControl(''),
    content : new FormControl(''),

  })
  
  constructor( private add:BlogService, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.Title =" Thêm tin tức  "
  }
  onFileChange(event: any) {
    this.file = event.target.files[0];
    const reader= new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload = (e: any)=>{
      this.preview = e.target.result;
    }
    console.log(this.file.name)
  }
  getImageUrl(BlogImage: string): void {
    this.add.getImageUrl(BlogImage)
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
    let title:any = this.profileFrom.value.title;
    let content:any = this.profileFrom.value.content;


    const formData = new FormData();
    formData.append("title", title);  
    formData.append("content", content);  
    formData.append("image_url", this.file, this.file.name);  


    this.add.addBlog(formData).subscribe(data => {
      console.log(data);
      if (data) {
        // Hiển thị SweetAlert2 thành công
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['admin/blog-admin']);
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
