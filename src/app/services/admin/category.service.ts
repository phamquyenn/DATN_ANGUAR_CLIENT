import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private httpClient: HttpClient) { }
  // categories
  getcategories():Observable<any[]>{
    return this.httpClient.get<any[]>(`${host}/categories/getall`);
  } 
  // getone 
  getonceCategory(id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/categories/getonce/${id}`)
  }
  // add
  addCategories(body: any): Observable<any> {
    return this.httpClient.post<any[]>(`${host}/categories/AddCategory`, body);
  }
  // update
  updateCategories(Id: any , CategoriesData: any): Observable<any> {
    const url = `${host}/categories/updateCategory/${Id}`;
    return this.httpClient.put<any[]>(url, CategoriesData);
  }
  // delete
    // DELETE
    deleteCategories( id : any){
      return this.httpClient.delete(`${host}/categories/deleteCategory/${id}`)
    }
}
