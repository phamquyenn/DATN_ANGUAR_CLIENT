import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/admin/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: any[] = []; 
  pageSize: number = 10;
  Title:any;
  p: number=1;

  constructor( private data:InventoryService){}


  ngOnInit(): void {
    this.Title=" Danh sách kho hàng";
    this.listInventory();
  }
  listInventory( ){
    this.data.getlistInventory().subscribe((res:any)=>{
      this.inventory= res[0];
      console.log(this.inventory)
    });
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  
}
