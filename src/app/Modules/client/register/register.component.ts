import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeGetDataService } from 'src/app/services/client/product.service';
import { UserService } from 'src/app/services/client/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  // check
  checkError : string ='';
  // Form
  formRegister : FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(20)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{3,}$/)]),
  });
  get allform(){
    return this.formRegister.controls;  
   }

  constructor (private reg:UserService){}

  ngOnInit(): void {
    
  }
  // 
  onRegister(){
    if( this.formRegister.invalid){
      return;
    }
    
    this.reg.register(this.formRegister.value).subscribe((res : any ) =>{
      if(res.status == false){
        this.checkError = res.result;
      }else{
        location.assign('/client/login')
      }
      
    })
  }
}
