import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const host = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private authService:AuthenticationService) { }

  // Get all orders
  getOrders(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any[]>(`${host}/order/getall`, { headers });
  }
  // Thống kê

  getSalesStatistics(timeframe: string, value: number): Observable<any> {
    const url = `${host}/order/Thongke/${timeframe}/${value}`;
    return this.httpClient.get<any>(url);
  }

  // Tổng tiền

  getToTalOrders(): Observable<any> {
    return this.httpClient.get<any>(`${host}/order/total_amount`);
  }
  getCountOrders(): Observable<any> {
    return this.httpClient.get<any>(`${host}/order/count`);
  }
  // 
  updateOrderStatus(orderId: string): Observable<any> {
    return this.httpClient.patch<any>(`${host}/order/update-status/${orderId}`, null, this.getHttpOptions());
  }

  cancelOrderStatus(orderId: string): Observable<any> {
    return this.httpClient.patch<any>(`${host}/order/cancel-order/${orderId}`, null, this.getHttpOptions());
  }
  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

}
