import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const host = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http:HttpClient) { }

  getCustomerOrders(customerId: number): Observable<any> {
    return this.http.get<any>(`${host}/order/customer/${customerId}`);
  }

  deleteOrder(productId: number): Observable<any> {
    const url = `${host}/order/delete/${productId}`;
    return this.http.delete<any>(url);
  }
}
