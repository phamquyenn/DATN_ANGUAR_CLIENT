import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const host = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private httpClient: HttpClient) { }
  getonce(id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/customer/getonce/${id}`)
  }
  getTotal():Observable<any[]>{
    return this.httpClient.get<any[]>(`${host}/customer/total_customers`)
  }
  getall():Observable<any[]>{
    return this.httpClient.get<any[]>(`${host}/customer/getall`)
  }
   // add
   add(body: any): Observable<any> {
    return this.httpClient.post<any[]>(`${host}/customer/AddCustomer`, body);
  }
  // update
  update(id: any , CustomerData: any): Observable<any> {
    const url = `${host}/customer/updatCustomer/${id}`;
    return this.httpClient.put<any[]>(url, CustomerData);
  }
  // delete
    // DELETE
    delete( id : any){
      return this.httpClient.delete(`${host}/customer/deletCustomer/${id}`)
    }
}
