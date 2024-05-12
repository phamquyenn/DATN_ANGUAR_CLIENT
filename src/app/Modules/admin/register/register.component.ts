import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/admin/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   // check
    checkError : string ='';
   // Form
    formRegister : FormGroup = new FormGroup({
     username : new FormControl('', [Validators.required, Validators.minLength(15)]),
     email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(20)]),
     password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{3,}$/)]),
     role: new FormControl('admin')
    });
    get allform(){
     return this.formRegister.controls;  
    }

  constructor(private auth: AuthenticationService) {}

  onRegister(){
    if( this.formRegister.invalid){
      return;
    }
    
    this.auth.register(this.formRegister.value).subscribe((res : any ) =>{
      if(res.status == false){
        this.checkError = res.result;
      }else{
        location.assign('/admin/login')
      }
      
    })
  }
}
