import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(  private httpClient: HttpClient) { }

  getdetailsbynewID(id:number){
    return this.httpClient.get<any[]>(`${host}/news/get-details-new-by-news/${id}`)
  }
  // ADD
  add(data: any): Observable<any> {
    const endpoint = `${host}/news/add-news-with-details`;
    return this.httpClient.post(endpoint, data);
  }
  // update
  update(id:any, data: any):Observable<any>{
    return this.httpClient.put(`${host}/news/update-news-and-details/${id}`, data);
  }
  // delete
  delete( id : any){
    return this.httpClient.delete(`${host}/news/delete-news-and-details/${id}`)
  }
  // get new
  GetLatestNews(){
    return this.httpClient.get<any[]>(`${host}/news/GetLatestNews`)
  }
}
