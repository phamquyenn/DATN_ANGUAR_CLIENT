import { Component } from '@angular/core';
import { AboutusService } from 'src/app/services/admin/aboutus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  Title:any;
  p: number=1;
  about: any[] = []; 
  pageSize: number = 10;
  Image :  string = '';

  constructor(private aboutus:AboutusService, private image: AboutusService){}

  ngOnInit(): void {
    this.Title=" Danh sách";
    this.view();
  }

  view(){
    this.aboutus.getabout().subscribe((res: any)=>{
      this.about = res;
      console.log(this.about)
    });
    
  }
  // 
  loadImage(filename: any) {
    this.image.getImageUrl(filename).subscribe(
      (response: any) => {
        this.Image = response.filename;
      },
      (error) => {
        console.error('Lỗi khi lấy tên ảnh:', error);
      }
    );
  }

  getImageUrl(filename: string): string {
    return `http://localhost:3000/about/getimage/${filename}`;
    
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
        this.aboutus.delete(id).subscribe(res => {
          this.view();
        });
      } else {
        console.log('Xóa đã bị hủy bởi người dùng.');
      }
    });
  }
}
