import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const host = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor( private httpClient: HttpClient) { }

    // getlistInventory
    getlistInventory():Observable<any>{
      return this.httpClient.get<any[]>(`${host}/inventory/GetProductInventory`)
    }
    // lấy đơn hàng nhập
    getall():Observable<any>{
      return this.httpClient.get<any[]>(`${host}/inventory/getall`)
    }
    // lấy chi tiết
    getallpurchaseorderdetails(purchaseOrderId:any):Observable<any>{
      return this.httpClient.get<any[]>(`${host}/inventory/purchase-order-details/${purchaseOrderId}`)
    }
}
