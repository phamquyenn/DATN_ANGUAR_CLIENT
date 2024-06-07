import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  admin: any;

  constructor(){}
  ngOnInit(): void {
    
    let storage =sessionStorage.getItem('adminInfo')
    if(storage){
      this.admin = JSON.parse(storage);
      console.log(this.admin)
      
    }
  }
  onLogout() {
    sessionStorage.clear();
    location.assign('/login-admin'); 
  }


}
