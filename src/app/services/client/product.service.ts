import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer, Subject, catchError, forkJoin, map ,of } from "rxjs";

const host = "http://localhost:3000"
@Injectable({
    providedIn: "root"
})

export class HomeGetDataService{
  
    constructor(private httpClient: HttpClient) {}
    // Search 
    searchProducts(term: string): Observable<any> {
        return this.httpClient.get<any>(`${host}/product/search?term=${term}`);
      }
    // 
    getAllDataForSearch(): Observable<any[]> {
        const productAll$ = this.getproductall(); 
        const brands$ = this.getbrand(); 
        return forkJoin([ productAll$, brands$]);
      }
    // product
    getnew():Observable<any[]>{
        return this.httpClient.get<any[]>(`${host}/product/new`);
    } 
    getproductall():Observable<any[]>{
        return this.httpClient.get<any[]>(`${host}/product/getall`);
    } 
    // GET ONCE PRODUCT
    getonceProduct(productId: any):Observable<any>{
        return this.httpClient.get<any[]>(`${host}/product/getonce/${productId}`)
    }
    // addProduct(id: any): Observable<any[]> {
    //     const body = { id: id };
    //     return this.httpClient.post<any[]>(`${host}/product/addproduct`, body);
    //   }
    // ADD
    addProduct(product: any): Observable<any> {
      const endpoint = `${host}/product/addproduct`;
      return this.httpClient.post(endpoint, product);
    }
    // IMAGE
    getImageUrl(filename: any): Observable<any> {
        const imageUrl = `${host}product/getproductimage/${filename}`;
        return this.httpClient.get<any[]>(imageUrl)
    }
    // UPDATE PRODUCTS
    updateproduct(productId:any, productData: any):Observable<any>{
        return this.httpClient.put(`${host}/product/updateproduct/${productId}`, productData);
    }
    // DELTE PRODUCT
    // brand
    getbrand():Observable<any[]>{
        return this.httpClient.get<any[]>(`${host}/brand/getall`)
    }
    // blog
    getblog():Observable<any[]>{
        return this.httpClient.get<any[]>(`${host}/news/getall`);
    } 
    //  categories
    getcategories():Observable<any[]>{
        return this.httpClient.get<any[]>(`${host}/categories/getall`);
    } 
    //  getproductsbycategories
    getproductsbycategoriesID(id:number){
        return this.httpClient.get<any[]>(`${host}/categories/GetProductsByCategory/${id}`)
    }
    // GetProductByBrand
    GetProductByBrand(id:number){
        return this.httpClient.get<any[]>(`${host}/product/getproductsbybrand/${id}`)
    }
    getbrandImageUrl(filename: any): Observable<any> {
        const imageUrl = `${host}brand/getimage/${filename}`;
        return this.httpClient.get<any[]>(imageUrl)
      }
    // getproduct by id
    getProductById(id:number){
        return this.httpClient.get<any[]>(`${host}/product/getonce/${id}`)
    }
    // CheckLogin
    checkLogin(data:any){
        return this.httpClient.post<any>(`${host}/login/dangnhap`, data);
    }

    // Register
    Register (data: any ){
        return this.httpClient.post<any>(`${host}/login/register`, data);
    }
    // get product bestsaler
    getbestsale():Observable<any[]>{
        return this.httpClient.get<any[]>(`${host}/product/bestsale`);
    } 
    
    //  Getall cart
    getcarts(){
        let cartJson = sessionStorage.getItem('cart')
        if(cartJson){
            return JSON.parse(cartJson);

        }else{
            return [];
        }
    }
    // Hàm này nhận một đối tượng giỏ hàng (carts) làm đối số
    saveCart(carts:any){
        let cartJson= JSON.stringify(carts);
        sessionStorage.setItem('cart',cartJson);

    }
    // tính và trả về tổng giá của tất cả các mục trong giỏ hàng
    getCartToTalPrice(){
        let carts = this.getcarts();
        let total = 0;
        carts.forEach((item: any) => {
            total += item.quantity *item.price;

        });
        return total;
    }
    // tính và trả về tổng số lượng của tất cả các mục trong giỏ hàng
    getCartToTalQuantity(){
        let carts = this.getcarts();
        let total = 0;
        carts.forEach((item: any) => {
            total += item.quantity;
          });
        return total;
    }
    // Tính số lượng trong cart
    getCartItemCount(): number {
        let carts = this.getcarts();
        let total = carts.length; 
        return total;
      }
    // 
    updateCartAndItemCount(carts: any[]) {
        this.saveCart(carts);
      }
    private dashbroadComponentSubject = new Subject<any>();
    dashbroadComponent$ = this.dashbroadComponentSubject.asObservable();

    setDashbroadComponent(component: any) {
    this.dashbroadComponentSubject.next(component);
  }
    
}