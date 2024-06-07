import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const host = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor( private httpClient: HttpClient) { }
  // getone 
  getonce(id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/contact/getonce/${id}`)
  }
  // getall
  getall():Observable<any>{
    return this.httpClient.get<any[]>(`${host}/contact/getall`)
  }
  // add
  add(contact: any): Observable<any> {
    const endpoint = `${host}/contact/add`;
    return this.httpClient.post(endpoint, contact);
  }
  // update
  update(id: any , BlogData: any): Observable<any> {
    const url = `${host}/contact/update/${id}`;
    return this.httpClient.put<any[]>(url, BlogData);
  }
  // DELETE
  delete( id : any){
    return this.httpClient.delete(`${host}/contact/delete/${id}`)
  }
  // 
  updateStatus(contactId: number, status: string, ) {
    return this.httpClient.put(`${host}/email/update-status/${contactId}`, { status });
  }

}
