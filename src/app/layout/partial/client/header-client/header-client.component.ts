import { Component, OnInit } from '@angular/core';
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
  filteredData: any[] = []; 
  productAllData: any[] = []; 
  brandsData:  any[] = []; 
  searchKeyword: string = '';
  searchSuggestions: string[] = [];
  category: any[]=[];

  constructor(private home: HomeGetDataService, private user: UserService, private router:Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.account = this.user.getAccountInfo();
    this.cartItemCount = this.home.getCartItemCount();
    // 
    this.fetchAllDataForSearch();
    this.home.getcategories().subscribe(res=>{
      this.category =res;
    })
  }

  onLogout() {
    sessionStorage.clear();
    location.assign('/client/Home'); 
  }

  fetchAllDataForSearch(): void {
    this.home.getAllDataForSearch().subscribe(
      (data: any[]) => {
        // Gán dữ liệu cho this.allData
        this.allData = data[0]; 
        const brandsData = data[1]; 
    

        
        this.productAllData = this.allData;
        this.brandsData = brandsData;
      },
      (error) => {
        console.error('Error fetching all data for search:', error);
      }
    );
  }
  

  search(keyword: string): void {
    if (!keyword.trim()) {
      this.filteredData = this.productAllData; 
      return;
    }
    this.filteredData = this.productAllData.filter(item => {
      return item && item.product_name && item.product_name.toLowerCase().includes(keyword.toLowerCase());
    });
    if (this.filteredData.length > 0) {
      // Chuyển hướng đến trang chi tiết của sản phẩm đầu tiên trong kết quả tìm kiếm
      this.router.navigate(['/client/productDetail', this.filteredData[0].product_id]);
    } else {
      // Sử dụng SweetAlert để hiển thị thông báo
      Swal.fire({
        icon: 'info',
        title: 'Không tìm thấy sản phẩm phù hợp',
        text: 'Vui lòng thử lại với từ khóa khác.',
      });
    }
  }
  onSearchInputChange(): void {
    if (this.searchKeyword.length > 0) {
      // Sử dụng this.allData để tạo searchSuggestions
      this.searchSuggestions = this.productAllData
        .filter(item => item.product_name.toLowerCase().includes(this.searchKeyword.toLowerCase()))
        .map(item => item.product_name);
 
    } else {
      this.searchSuggestions = [];
      
    }
  }
}
