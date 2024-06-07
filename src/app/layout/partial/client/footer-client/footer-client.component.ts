import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutusService } from 'src/app/services/admin/aboutus.service';
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
  Abouts: any[] = [];

  constructor (private data:HomeGetDataService, private active: ActivatedRoute, private about:AboutusService){}
  ngOnInit(): void {
    this.Categories();
    this.About();
  };
  Categories(){
    this.data.getcategories().subscribe(res=>{
      
      this.categories =res;
      
    })
  };
  About(){
    this.about.getabout().subscribe(res =>{
      this.Abouts =  res;
      console.log(this.Abouts)
    });
  }
  GetCategoriesByID(){
    this.id = this.active.paramMap.subscribe((query: any ) =>{
      this.id =query.get('id');
  
      this.data.getproductsbycategoriesID(this.id).subscribe(res => {
        this.productall = res;
        
      });
    })
  }
  
  
  
}
