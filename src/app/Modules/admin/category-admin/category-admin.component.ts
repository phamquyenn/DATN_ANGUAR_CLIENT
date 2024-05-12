import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/admin/category.service';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit{
  
    Title:any;
    p: number=1;
    categorys: any[] = []; 
    pageSize: number = 10;

    constructor(private categoryy:CategoryService){ }

    ngOnInit(): void {
      this.Title ="Danh Sách Loại sản phẩm  "
      this.Categories();
    }
    Categories(){
      this.categoryy.getcategories().subscribe((res: any)=>{
        this.categorys = res;
        
      })
    }
    // DELETE
    onDelete(id: number) {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked "Đồng ý"
          this.categoryy.deleteCategories(id).subscribe(res => {
            this.Categories();
          });
        } else {
          console.log('Xóa sản phẩm đã bị hủy bởi người dùng.');
        }
      });
    }

}
