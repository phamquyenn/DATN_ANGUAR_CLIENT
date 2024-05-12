import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  Title: any;
  categories:any;
  public Editor = ClassicEditor;

  profileForm: FormGroup = new FormGroup({
    category_name: new FormControl(''),
  })
  constructor(private add:CategoryService) {
    
  }
  ngOnInit(): void {
    
  }
  onAddloaisp(){ 
    if(this.profileForm.invalid) {
      return;
    }
    this.add.addCategories(this.profileForm.value).subscribe( function(res: any){   
      Swal.fire({
        title: 'Thêm mới thành công',
        icon: 'success'
        }).then((result) => {
        if (result.isConfirmed) {
          location.assign('http://localhost:4200/admin/category-admin');
        }
      });
    });  
  }
}
