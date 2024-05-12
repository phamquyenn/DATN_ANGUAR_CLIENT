import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const host = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenKey = 'auth_token_quyen';

  constructor(private http: HttpClient) { }

  // Kiểm tra đăng nhập
  checkLogin(data:any){
    return this.http.post<any>(`${host}/login/admin-login`, data);
  }

  // Đăng ký
  register(data: any): Observable<any> {
    return this.http.post<any>(`${host}/login/register`, data);
  }

  // Lưu token vào localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Lấy thông tin người dùng
  getUserInfo(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${host}/login/admin-info`, { headers });
  }

  
}
