import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/services/client/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent implements OnInit{

  id: any;
  details_new : any[]=[];
  Title: any;
  p: number=1;
  pageSize: number = 10;




  constructor( private details:NewsService, private active: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {

    this.Title ="Danh Sách "


    this.id = this.active.paramMap.subscribe((query: any ) =>{
      this.id =query.get('id');

      this.details.getdetailsbynewID(this.id).subscribe(res => {
        this.details_new = res;
        console.log( this.details_new)
      });
    })
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
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
        this.details.delete(id).subscribe(res => {
          this.router.navigate(['admin/blog-admin']);
        });
      } else {
        // User clicked "Hủy" or closed the dialog
        console.log('Xóa sản phẩm đã bị hủy bởi người dùng.');
      }
    });
  }
}
