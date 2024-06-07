import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/app/services/admin/inventory.service';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.css']
})
export class PurchaseOrderDetailsComponent implements OnInit {

  purchase_orders_id: any;
  detailsPurchase: any [] = [];
  Title:any;
  p: number=1;

  constructor(private call:InventoryService, private route: ActivatedRoute){}


  ngOnInit(): void {
    
    this.Title ="Danh Sách Chi Tiết "

    this.route.paramMap.subscribe((params) => {
      this.purchase_orders_id = params.get('id');
      // console.log('đây là id', this.purchase_orders_id);
      this.call.getallpurchaseorderdetails(this.purchase_orders_id).subscribe((data:any)=>{
        this.detailsPurchase =data;
        console.log(this.detailsPurchase)
      })
    });
  }
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
}
