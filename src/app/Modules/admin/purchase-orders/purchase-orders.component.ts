import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/admin/inventory.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {

  Title:any;
  p: number=1;
  purchaseOder:  any[] = []; 
  constructor( private call:InventoryService){}

  ngOnInit(): void {
    this.Title ="Danh Sách "

    this.call.getall().subscribe((res:any)=>{
      this.purchaseOder =res
      console.log(res)
    })
  }

}
