import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  Title: any;
  Id: string | null = null;
  category: any

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) 
    {
      this.profileForm = this.fb.group({
        category_id: [''],
        category_name: ['']
       
      });

    }

 ngOnInit(): void {
    this.Title = 'Sửa Loại';

    this.update.getcategories().subscribe((res) => {
      this.category = res;
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.Id = params.get('id');

      if (this.Id) {
        this.Title = 'Cập Nhật Loại Sản Phẩm';
        this.update.getonceCategory(this.Id).subscribe((res) => {
          const list = res[0];
          
          // Đặt giá trị cho form
          this.profileForm.patchValue(list);
        });
      } 
    });
  }

  onSubmit(): void {
    if (!this.Id) {
      console.error('loại sản phẩm không tồn tại.');
      return;
    }

    const CategoriesData = this.profileForm.value;
    console.log(CategoriesData);
    const formData = new FormData();

    for (const key in CategoriesData) {
      formData.append(key, CategoriesData[key]);
    }


    this.update.updateCategories(this.Id, formData).subscribe(
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
            this.router.navigate(['admin/category-admin']);
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

}
