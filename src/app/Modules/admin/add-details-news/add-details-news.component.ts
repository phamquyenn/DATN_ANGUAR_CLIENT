import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from 'src/app/services/admin/blog.service';
import { NewsService } from 'src/app/services/client/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-details-news',
  templateUrl: './add-details-news.component.html',
  styleUrls: ['./add-details-news.component.css']
})
export class AddDetailsNewsComponent implements OnInit {
  Title: any;
  file: any;
  preview: any;
  public Editor = ClassicEditor;


  profileFrom =  new FormGroup({
    news_title : new FormControl(''),
    news_content : new FormControl(''),
    author: new FormControl(''),
    detail_title: new FormControl(''),
    detail_content: new FormControl(''),
    
  })
  
  constructor( private add:NewsService, private fb: FormBuilder, private router: Router, private image:BlogService){}

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
   
  }
  getImageUrl(BlogImage: string): void {
    this.image.getImageUrl(BlogImage)
      .subscribe(
        imageUrl => {
          this.preview = imageUrl;
        },
        error => {
          console.error('Error getting image URL:', error);
        }
      );
  }
 
  onSubmit() {

    console.log(this.profileFrom.value)
    let news_title:any = this.profileFrom.value.news_title;
    let news_content:any = this.profileFrom.value.news_content;
    let author:any = this.profileFrom.value.author;
    let detail_title:any = this.profileFrom.value.detail_title;
    let detail_content:any = this.profileFrom.value.detail_content;



    const formData = new FormData();
    formData.append("news_title", news_title);  
    formData.append("news_content", news_content);  
    formData.append("image_url", this.file, this.file.name);  
    formData.append("author", author);  
    formData.append("detail_title", detail_title);  
    formData.append("detail_content", detail_content);  


    this.add.add(formData).subscribe(data => {
      console.log(data);
      if (data) {
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
