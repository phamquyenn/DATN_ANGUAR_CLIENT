import { Component, OnInit } from '@angular/core';
import { VnpayService } from 'src/app/services/client/vnpay.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  vnpayResult: any;


  constructor( private vnpay:VnpayService){}

  ngOnInit(): void {
    this.getVnpayResult();
  }
  getVnpayResult(): void {
    this.vnpay.getVnpayResult()
      .subscribe(result => {
        this.vnpayResult = result;
        console.log('đây là ',this.vnpayResult)
      });
  }
}
