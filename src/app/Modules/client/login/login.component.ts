// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/client/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkError: any;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl ('',[Validators.required, Validators.email, Validators.minLength(15)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private login: UserService,
    private router: Router,
  ) {}

  get allform(){
    return this.formLogin.controls;
  }

  ngOnInit(): void {}

  onLogin() {
    this.login.checkLogin(this.formLogin.value).subscribe(
      (res: any) => {
        const token = res.token;
        // console.log(res)
        if (token) {
          localStorage.setItem('token', token);
          this.login.getUserInfo(token).subscribe(
            (userInfo: any) => {
              if (userInfo) {
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                this.router.navigate(['/client/Home']).then(() => {
                  window.location.reload();
                });
                
              } else {
                console.error('Lỗi: Không có thông tin người dùng.');
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
