import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {
  account: any;
  cartItemCount: number = 0;
  allData: any[] = [];
  // filteredData: any[] = []; 
  productAllData: any[] = []; 
  brandsData:  any[] = []; 
  term: any = '';
  searchResults: any[] = [];
  // searchSuggestions: string[] = [];
  category: any[]=[];

  searchForm: FormGroup;
  // profileFrom =  new FormGroup({
  //   term : new FormControl(''),
  // })

  
  constructor(private home: HomeGetDataService,
     private user: UserService,
      private router:Router, 
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
     ) {
      this.searchForm = this.formBuilder.group({
        term: ['']
      });
     }

  ngOnInit(): void {
    this.account = this.user.getAccountInfo();
    this.cartItemCount = this.home.getCartItemCount();
    // 
    this.home.getcategories().subscribe(res=>{
      this.category =res;
    })
    
    
  }

  onLogout() {
    sessionStorage.clear();
    location.assign('/client/Home'); 
  }

  search(): void {
    const term:string = this.searchForm.value.term;

    console.log( term)

    if (term.trim() === '') {
      return;
    }
    this.home.searchProducts(term).subscribe(
      (data) => {
          // Kiểm tra xem có sản phẩm nào được trả về không
          if (data && data.length > 0) {
              const firstProduct = data[0];
              this.router.navigate(['client/productDetail', firstProduct.product_id]); 
          } else {
              Swal.fire({
                  icon: 'info',
                  title: 'Không tìm thấy sản phẩm',
                  text: 'Không có sản phẩm phù hợp được tìm thấy.',
              });
          }
      },
      (error) => {
          console.error('Lỗi khi tìm kiếm sản phẩm:', error);
          // Hiển thị thông báo lỗi nếu cần
          Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm. Vui lòng thử lại sau.',
          });
      }
    );
  }
 
  

  
}
