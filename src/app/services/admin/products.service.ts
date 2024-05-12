import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Observer, catchError, map ,of } from "rxjs";


const host = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpclient:HttpClient) { }
  // TẤT CẢ SẢN PHẨM 
  getproductall():Observable<any[]>{
      return this.httpclient.get<any[]>(`${host}/product/getall`);
    } 
  // GET ONCE PRODUCT
  getonceProduct(productId: any):Observable<any>{
      return this.httpclient.get<any[]>(`${host}/product/getonce/${productId}`)
  }
  // THÊM SẢN PHẨM 
  addProduct(product: any): Observable<any> {
    const endpoint = `${host}/product/addproduct`;
    return this.httpclient.post(endpoint, product);
  }
  // IMAGE
  getImageUrl(filename: any): Observable<any> {
    const imageUrl = `${host}product/getproductimage/${filename}`;
    return this.httpclient.get<any[]>(imageUrl)
  }
  // UPDATE PRODUCTS
  updateProduct(productId: any , productData: any): Observable<any> {
    const url = `${host}/product/updateproduct/${productId}`;
    return this.httpclient.put<any[]>(url, productData);
  }
  // DELETE
  deleteproduct( id : any){
    return this.httpclient.delete(`${host}/product/deleteproduct/${id}`)
  }
  //  categories
  getcategories():Observable<any[]>{
    return this.httpclient.get<any[]>(`${host}/categories/getall`);
  } 
  // brand
  getbrand():Observable<any[]>{
    return this.httpclient.get<any[]>(`${host}/brand/getall`)
  }
  // imageupload
  getProductImage(imageName: any):Observable<any> {
    return this.httpclient.get<any[]>(`${host}/product/getproductimage/${imageName}`)
  }
  // 
  getallimage():Observable<any> {
    return this.httpclient.get<any[]>(`${host}/image/getallimagesinfo`)
  }
  // delete
  deleteImage(filename: any){
    return this.httpclient.delete(`${host}/image/delete/${filename}`)
  }

}
