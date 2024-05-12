import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/admin/products.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  
  Title: any;
  // formProducts: FormGroup;
  brands: any;
  category: any;
  file: any;
  preview: any;
  public Editor = ClassicEditor;


  profileFrom =  new FormGroup({
    product_name : new FormControl(''),
    description : new FormControl(''),
    brand : new FormControl(''),
    price : new FormControl(''),
    quantity : new FormControl(''),
    volume : new FormControl(''),
    fragrance_family : new FormControl(''),
    fragrance_notes : new FormControl(''),
    gender : new FormControl(''),
    // product_image : new FormControl(''),
    category_id : new FormControl(''),
    brand_id : new FormControl(''),
  })

  constructor (private fb: FormBuilder, private add:ProductsService, private router: Router){

  }


  ngOnInit(): void {
    this.Title =" Thêm Sản phẩm  "

    this.add.getcategories().subscribe(res => {
      this.category = res;
    });

    this.add.getbrand().subscribe(res => {
      this.brands = res;

    });
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
  getImageUrl(productImage: string): void {
    this.add.getImageUrl(productImage)
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
    let product_name:any = this.profileFrom.value.product_name;
    let description:any = this.profileFrom.value.description;
    let brand:any = this.profileFrom.value.brand;
    let price:any = this.profileFrom.value.price;
    let quantity:any = this.profileFrom.value.quantity;
    let volume:any = this.profileFrom.value.volume;
    let fragrance_family:any = this.profileFrom.value.fragrance_family;
    let fragrance_notes:any = this.profileFrom.value.fragrance_notes;
    let gender:any = this.profileFrom.value.gender;
    // let product_image:any = this.profileFrom.value.product_image;
    let category_id:any = this.profileFrom.value.category_id;
    let brand_id:any = this.profileFrom.value.brand_id;

    const formData = new FormData();
    formData.append("product_name", product_name);  
    formData.append("description", description);  
    formData.append("brand", brand);  
    formData.append("price", price);  
    formData.append("quantity", quantity); 
    formData.append("volume", volume);  
    formData.append("fragrance_family", fragrance_family);  
    formData.append("fragrance_notes", fragrance_notes);  
    formData.append("gender", gender);  
    formData.append("product_image", this.file, this.file.name);  
    formData.append("category_id", category_id);  
    formData.append("brand_id", brand_id);  

    this.add.addProduct(formData).subscribe(data => {
      console.log(data);
      if (data) {
        // Hiển thị SweetAlert2 thành công
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
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
          text: 'Đã xảy ra lỗi khi thêm sản phẩm.',
        });
      }
    });


  }
}
