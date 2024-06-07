import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

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
