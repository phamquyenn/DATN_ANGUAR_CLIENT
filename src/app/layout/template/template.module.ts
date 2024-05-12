import {NgModule} from '@angular/core';
import { LayoutClientComponent } from './layout-client/layout-client.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ClientRoutingModule } from 'src/app/Modules/client/client-routing.module';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { ClientModule } from 'src/app/Modules/client/client.module';
import { PartialModule } from '../partial/partial.module';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RegisterAdminComponent } from './register-admin/register-admin.component';




@NgModule({ 
    declarations:[
    LayoutClientComponent,
    LayoutAdminComponent,
    LoginAdminComponent,
    RegisterAdminComponent
  ],
    imports:[
  
        CommonModule,
        RouterModule,
        BrowserModule,
        ClientRoutingModule,
        ClientModule,
       PartialModule,
       ReactiveFormsModule

    ]
}) 
export class TemplateModule{}