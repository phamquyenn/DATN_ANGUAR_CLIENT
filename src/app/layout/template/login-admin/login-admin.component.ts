import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/admin/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  checkError: any;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl ('',[Validators.required, Validators.email, Validators.minLength(15)]),
    password: new FormControl('',[Validators.required]),
  });


  constructor(private auth:AuthenticationService, private router: Router){}

  get allform(){
    return this.formLogin.controls;
  }

  ngOnInit(): void { }

  onLogin() {
    this.auth.checkLogin(this.formLogin.value).subscribe(
      (res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem('token', token);
          this.auth.getUserInfo(token).subscribe(
            (adminInfo: any) => {
              if (adminInfo && adminInfo.user && adminInfo.user.role === 'admin') {
                sessionStorage.setItem('adminInfo', JSON.stringify(adminInfo.user));
                this.router.navigate(['/admin/dashbroad']).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Không có thông tin người dùng hoặc không phải là quản trị viên.',
                });
              }
            },
            (error) => {
              console.error('Lỗi khi gọi API getUserInfo:', error);
            }
          );
        } else {
          console.log('Server trả về một response không hợp lệ.');
        }
      },
      (error) => {
        console.error('Lỗi trong quá trình đăng nhập:', error);
      }
    );
  }
}
