import { Component } from '@angular/core';
import { AboutusService } from 'src/app/services/admin/aboutus.service';
import { ProductsService } from 'src/app/services/admin/products.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  constructor(private aboutus:AboutusService, private image: ProductsService, private brand: HomeGetDataService){}
  about: any[]=[];
  blogImage: string ='';
  brands:  any[] = [];
// 

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

// 
  ngOnInit(){
    this.aboutus.getabout().subscribe(res=>{
      
      this.about =res;
      console.log(this.about)
      
    }),
    this.brand.getbrand().subscribe(res => {
      this.brands = res;
    });
  }
  // 
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
// 
  getImageUrl(filename: string): string {
    return `http://localhost:3000/about/getimage/${filename}`;
    
  }
  getImageUrlBrand(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
  }
}
