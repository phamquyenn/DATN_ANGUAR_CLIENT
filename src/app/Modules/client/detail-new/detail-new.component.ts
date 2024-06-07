import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import { NewsService } from 'src/app/services/client/news.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';

@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.css']
})
export class DetailNewComponent {
  constructor(
    private blog:HomeGetDataService, 
    private image: ProductsService,
     private active: ActivatedRoute,
    private details: NewsService){}
  blogs: any[]=[];
  category : any[]=[];
  brands: any[]=[];
  blogImage: string ='';
  p: number=1;
  pageSize: number = 10;
  id: any;
  details_new : any[]=[];

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

  ngOnInit(){
    this.blog.getblog().subscribe(res=>{
      this.blogs =res;
    }),
    this.id = this.active.paramMap.subscribe((query: any ) =>{
      this.id =query.get('id');

      this.details.getdetailsbynewID(this.id).subscribe(res => {
        this.details_new = res;
        console.log( this.details_new)
      });
    })
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
