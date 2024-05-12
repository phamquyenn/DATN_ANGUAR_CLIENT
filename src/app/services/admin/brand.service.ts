import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor( private httpClient: HttpClient) { }
  // Thuong Hieu
  getbrand():Observable<any[]>{
    return this.httpClient.get<any[]>(`${host}/brand/getall`)
  } 
  // getone 
  getonceBrand(id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/brand/getonce/${id}`)
  }
  // add
  addBrand(brand: any): Observable<any> {
    const endpoint = `${host}/brand/addbrand`;
    return this.httpClient.post(endpoint, brand);
  }
  // IMAGE
  getImageUrl(filename: any): Observable<any> {
    const imageUrl = `${host}brand/getimage/${filename}`;
    return this.httpClient.get<any[]>(imageUrl)
  }
  // update
  updateBrand(id: any , brandData: any): Observable<any> {
    const url = `${host}/brand/updatebrand/${id}`;
    return this.httpClient.put<any[]>(url, brandData);
  }
  // DELETE
  deletebrand( id : any){
    return this.httpClient.delete(`${host}/brand/deleteBrand/${id}`)
  }

}
