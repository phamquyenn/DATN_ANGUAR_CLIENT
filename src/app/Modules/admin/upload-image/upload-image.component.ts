import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/admin/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  allimage: any;
  Title: string = "Danh Sách ảnh đã được upload ";
  p: number = 1;
  productImage: string = '';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadAllImages();
  }

  loadAllImages() {
    this.productService.getallimage().subscribe(
      (res: any) => {
        this.allimage = res;
        console.log(this.allimage);
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
      }
    );
  }

  loadProductImage(filename: any) {
    this.productService.getProductImage(filename).subscribe(
      (response: any) => {
        this.productImage = response.filename;
        console.log(this.productImage)
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  onDelete(filename: string) {
    // Hiển thị SweetAlert để xác nhận trước khi xóa
    Swal.fire({
      title: 'Xác nhận xóa ảnh',
      text: 'Bạn có chắc chắn muốn xóa ảnh này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng xác nhận, thực hiện xóa ảnh
        this.productService.deleteImage(filename).subscribe(
          () => {
            // Hiển thị SweetAlert khi ảnh được xóa thành công
            Swal.fire({
              icon: 'success',
              title: 'Ảnh đã được xóa thành công!',
              showConfirmButton: false,
              timer: 1500  // Tự động đóng sau 1.5 giây
            });
            this.loadAllImages();
          },
          (error) => {
            // Hiển thị SweetAlert khi có lỗi khi xóa ảnh
            Swal.fire({
              icon: 'error',
              title: 'Lỗi khi xóa ảnh',
              text: error.message || 'Đã có lỗi xảy ra!',
            });
            console.error('Lỗi khi xóa ảnh:', error);
          }
        );
      }
    });
  }
}
