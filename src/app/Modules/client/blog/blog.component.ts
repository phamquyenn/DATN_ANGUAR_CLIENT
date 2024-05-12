import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor(private blog:HomeGetDataService, private image: ProductsService){}
  blogs: any[]=[];
  category : any[]=[];
  brands: any[]=[];
  blogImage: string ='';
  p: number=1;
  pageSize: number = 10;


  ngOnInit(){
    this.blog.getblog().subscribe(res=>{
      this.blogs =res;
      console.log( this.blogs)
    }),
    this.blog.getcategories().subscribe(res=>{
      this.category =res;
    })
    this.blog.getbrand().subscribe(res=>{
      this.brands =res;
    })
  }
  loadProductImage(filename: any) {
    this.image.getProductImage(filename).subscribe(
      (response: any) => {
        this.blogImage = response.filename;
        console.log(this.blogImage)
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
}
