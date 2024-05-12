import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CookieService } from 'ngx-cookie-service';

import { ClientModule } from './Modules/client/client.module';
import { TemplateRoutingModule } from './layout/template/template-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashbroadComponent } from './Modules/admin/dashbroad/dashbroad.component';
import { AdminModule } from './Modules/admin/admin.module';
import { TopbaComponent } from './layout/partial/admin/topba/topba.component';
import { TemplateModule } from './layout/template/template.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuardService } from './services/admin/auth-gaurd.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientModule,
    AdminModule,
    TemplateRoutingModule,
    MatDialogModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [
    AuthGuardService,
    CookieService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
