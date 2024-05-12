import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-product-admin',
  templateUrl: './update-product-admin.component.html',
  styleUrls: ['./update-product-admin.component.css']
})
export class UpdateProductAdminComponent implements OnInit {
  Title: any;
  brands: any;
  category: any;
  file: any | null = null;
  preview: any | null = null;
  productId: string | null = null;
  public Editor = ClassicEditor;


  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      product_id: [''],
      product_name: [''],
      description: [''],
      brand: [''],
      price: [''],
      quantity: [''],
      volume: [''],
      fragrance_family: [''],
      fragrance_notes: [''],
      gender: [''],
      category_id: [''],
      brand_id: [''],
    });
  }

  ngOnInit(): void {
    this.Title = 'Sửa Sản Phẩm';

    this.productService.getcategories().subscribe((res) => {
      this.category = res;
    });

    this.productService.getbrand().subscribe((res) => {
      this.brands = res;
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');

      if (this.productId) {
        this.Title = 'Cập Nhật Sản Phẩm';

        // Lấy thông tin sản phẩm và hiển thị hình ảnh
        this.productService.getonceProduct(this.productId).subscribe((res) => {
          const Upro = res[0];
          this.getImageUrl(Upro.product_image);

          // Đặt giá trị cho form
          this.profileForm.patchValue(Upro);
        });
      } else {
        this.Title = 'Thêm Sản Phẩm Mới';
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
    this.productService.getImageUrl(productImage).subscribe(
      (imageUrl) => {
        this.preview = imageUrl;
      },
      (error) => {
        console.error('Error getting image URL:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.productId) {
      console.error('Product ID is not available.');
      return;
    }

    const productData = this.profileForm.value;
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    formData.append('product_image', this.file);

    this.productService.updateProduct(this.productId, formData).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          // Hiển thị SweetAlert2 thành công
          Swal.fire({
            icon: 'success',
            title: 'Sửa thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['admin/product-admin']);
          });
        } else {
          // Hiển thị SweetAlert2 lỗi
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
          });
        }
      },
      (error) => {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    
        // Hiển thị SweetAlert2 lỗi
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
        });
      }
    );
  }
}
