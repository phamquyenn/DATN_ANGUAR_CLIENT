import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbroadComponent } from './dashbroad/dashbroad.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BrandAdminComponent } from './brand-admin/brand-admin.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { UpdateProductAdminComponent } from './update-product-admin/update-product-admin.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
// import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { AuthGuardService } from 'src/app/services/admin/auth-gaurd.service';
import { AddAboutusComponent } from './add-aboutus/add-aboutus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UpdateAboutusComponent } from './update-aboutus/update-aboutus.component';
import { OrderComponent } from './order/order.component';




const routes: Routes = [
  // {
  //   path:'register',
  //   component:RegisterComponent
  // },

  {
    path:'dashbroad',
    component:DashbroadComponent,
  },
  {
    path:'product-admin',
    component:ProductAdminComponent
  },
  {
    path:'product-add',
    component:AddProductComponent
  },
  {
    path:'brand-admin',
    component:BrandAdminComponent
  },
  {
    path:'blog-admin',
    component:BlogAdminComponent
  },
  {
    path:'category-admin',
    component:CategoryAdminComponent
  },

  {
    path:'product-update/:id',
    component:UpdateProductAdminComponent
  },
  {
    path:'update-customer/:id',
    component:UpdateCustomerComponent
  },
  
  {
    path:'UploadImage',
    component:UploadImageComponent
  },
  {
    path:'add-brand',
    component:AddBrandComponent
  },
  {
    path:'add-blog',
    component:AddBlogComponent
  },
  {
    path:'add-category',
    component:AddCategoryComponent
  },
  {
    path:'update-blog/:id',
    component:UpdateBlogComponent
  },
  {
    path:'update-brand/:id',
    component:UpdateBrandComponent
  },
  {
    path:'update-category/:id',
    component:UpdateCategoryComponent
  },
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'add-customer',
    component:AddCustomerComponent
  },
  {
    path:'add-aboutus',
    component:AddAboutusComponent
  },
  {
    path:'About-us',
    component:AboutusComponent
  },
  {
    path:'update-aboutus/:id',
    component:UpdateAboutusComponent
  },
  {
    path:'order',
    component:OrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
