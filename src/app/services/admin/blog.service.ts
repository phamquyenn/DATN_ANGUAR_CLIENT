import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor( private httpClient: HttpClient) { }
  // blog
  getblog():Observable<any[]>{
    return this.httpClient.get<any[]>(`${host}/news/getallamin`);
  } 
  // getone 
  getonceBlog(id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/news/getonce/${id}`)
  }
  // add
  addBlog(blog: any): Observable<any> {
    const endpoint = `${host}/news/addnews`;
    return this.httpClient.post(endpoint, blog);
  }
  // IMAGE
  getImageUrl(filename: any): Observable<any> {
    const imageUrl = `${host}news/getproductimage/${filename}`;
    return this.httpClient.get<any[]>(imageUrl)
  }
  // update
  updateBlog(id: any , BlogData: any): Observable<any> {
    const url = `${host}/news/updatenews/${id}`;
    return this.httpClient.put<any[]>(url, BlogData);
  }
  // DELETE
  delete( id : any){
    return this.httpClient.delete(`${host}/news/deletenews/${id}`)
  }


}
