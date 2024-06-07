import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/admin/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  Title:any;
  p: number=1;
  contact: any[] = []; 


  constructor(private call:ContactService){}


  ngOnInit(): void {
   this.Listcontact();
   this.Title=" Danh sách ";
   
  }
  Listcontact(){
    this.call.getall().subscribe((res: any)=>{
      this.contact = res;
      console.log(this.contact)
    });
  }
}
