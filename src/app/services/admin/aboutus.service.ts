import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  constructor( private httpClient: HttpClient) { }
  // Thuong Hieu
  getabout():Observable<any[]>{
    return this.httpClient.get<any[]>(`${host}/about/getall`)
  } 
  // getone 
  getonce(id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/about/getonce/${id}`)
  }
  // add
  add(brand: any): Observable<any> {
    const endpoint = `${host}/about/addabout`;
    return this.httpClient.post(endpoint, brand);
  }
  // IMAGE
  getImageUrl(filename: any): Observable<any> {
    const imageUrl = `${host}/about/getimage/${filename}`;
    return this.httpClient.get<any[]>(imageUrl)
  }
  // update
  update(id: any , data: any): Observable<any> {
    const url = `${host}/about/updateabout/${id}`;
    return this.httpClient.put<any[]>(url, data);
  }
  // DELETE
  delete( id : any){
    return this.httpClient.delete(`${host}/about/delete/${id}`)
  }
}
