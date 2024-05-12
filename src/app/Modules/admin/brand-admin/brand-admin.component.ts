import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/admin/brand.service';
import { ProductsService } from 'src/app/services/admin/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-admin',
  templateUrl: './brand-admin.component.html',
  styleUrls: ['./brand-admin.component.css']
})
export class BrandAdminComponent implements OnInit {
  
  Title:any;
  p: number=1;
  brands: any[] = []; 
  pageSize: number = 10;
  beandImage :  string = '';

  constructor(private brand:BrandService, private image: ProductsService){}

  ngOnInit(): void {
    this.Title=" Danh sách thương hiệu";
    this.brandview();
  }

  brandview(){
    this.brand.getbrand().subscribe((res: any)=>{
      
      this.brands = res;
      console.log(this.brands)

    });
  }
  // 
  loadProductImage(filename: any) {
    this.brand.getImageUrl(filename).subscribe(
      (response: any) => {
        this.beandImage = response.filename;
        console.log(this.beandImage)
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/brand/getimage/${filename}`;
    
  }
  // 
  onDelete(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Đồng ý"
        this.brand.deletebrand(id).subscribe(res => {
          this.brandview();
        });
      } else {
        console.log('Xóa thương hiệu đã bị hủy bởi người dùng.');
      }
    });
  }


}
