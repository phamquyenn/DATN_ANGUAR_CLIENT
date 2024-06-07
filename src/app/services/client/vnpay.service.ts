import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const host = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class VnpayService    {

  constructor( private httpClient: HttpClient) { }
  
  // Post tạo url thanh toán
  createPaymentUrl(payment:any): Observable<any> {
    const endpoint = `${host}/vnpayment/create_payment_url`;
    return this.httpClient.post<any>(endpoint, payment);
    
  }
  //  thanh toán cod
  createCodPayment(paymentData: any): Observable<any> {
    const endpoint = `${host}/paymentcod/create_cod_payment`;

    return this.httpClient.post<any>(endpoint, paymentData);
  }
  // 
  PaymentUrl(paymentData: any): Observable<any> {
    const proxyUrl = `${host}/vnpayment/vnpayment-proxy`;
    return this.httpClient.post(proxyUrl, paymentData);
  }
  // 
  getVnpayResult(): Observable<any> {
    return this.httpClient.get<any>(`${host}/vnpayment/vnpay_return`);
  }
  // POST querydr
  queryTransaction(orderId: string, transDate: string): Observable<any> {
    const body = {
      orderId: orderId,
      transDate: transDate
    };
    return this.httpClient.post<any>(`${host}/vnpayment/querydr`, body);
  }
  // POST refund
  refundTransaction(orderId: string, transDate: string, amount: number, transType: string, user: string): Observable<any> {
    const body = {
      orderId: orderId,
      transDate: transDate,
      amount: amount,
      transType: transType,
      user: user
    };
    return this.httpClient.post<any>(`${host}/vnpayment/refund`, body);
  }


}
