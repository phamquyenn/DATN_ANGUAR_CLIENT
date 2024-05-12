import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-topba',
  templateUrl: './topba.component.html',
  styleUrls: ['./topba.component.css']
})
export class TopbaComponent implements OnInit {
  admin:any;

  constructor( ) {}
  ngOnInit(): void {
    
    let storage =sessionStorage.getItem('adminInfo')
    if(storage){
      this.admin = JSON.parse(storage);
      
    }
  }
  onLogout() {
    sessionStorage.clear();
    location.assign('/login-admin'); 
  }

  
}
