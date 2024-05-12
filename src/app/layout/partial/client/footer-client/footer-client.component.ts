import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeGetDataService } from 'src/app/services/client/product.service';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {
  categories: any[]=[];
  id: any;
  productall: any[] = [];


  constructor (private data:HomeGetDataService, private active: ActivatedRoute){}
  ngOnInit(): void {
    this.Categories();
  };
  Categories(){
    this.data.getcategories().subscribe(res=>{
      
      this.categories =res;
      
    })
  };
  GetCategoriesByID(){
    this.id = this.active.paramMap.subscribe((query: any ) =>{
      this.id =query.get('id');
  
      this.data.getproductsbycategoriesID(this.id).subscribe(res => {
        this.productall = res;
        
      });
    })
  }
  
  
  
}
