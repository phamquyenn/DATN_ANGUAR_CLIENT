import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor( private httpClient: HttpClient) { }

  addFavorites(data: any): Observable<any> {
    const endpoint = `${host}/favorites/add`;
    return this.httpClient.post(endpoint, data);
  }

  getFavorites(customer_id: any):Observable<any>{
    return this.httpClient.get<any[]>(`${host}/favorites/getall/${customer_id}`);
  }

  delete(id : any){
    return this.httpClient.delete(`${host}/favorites/delete/${id}`)
  }

}
