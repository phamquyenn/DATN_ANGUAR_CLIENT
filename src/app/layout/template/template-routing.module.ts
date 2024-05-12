
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './layout-client/layout-client.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { SilerClientComponent } from '../partial/client/siler-client/siler-client.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trang',
    },
    component: LayoutClientComponent,
    children: [
      {
        path: 'client',
        loadChildren: () =>
          import('../../Modules/client/client.module').then(
            (x) => x.ClientModule
          ),
      },
    ],
  },
  {
    path: '',
    data: {
      title: 'Trang',
    },
    component: LayoutAdminComponent,
    children: [
      {
        path:'admin',
        loadChildren: () =>
          import('../../Modules/admin/admin.module').then(
            (x) => x.AdminModule
          ),
      },
    ],
  },
  {
    path:'slier',
    component:SilerClientComponent
  },
  {
    path:'login-admin',
    component:LoginAdminComponent,
    title:'Đăng Nhập'
  },
  {
    path:'register-admin',
    component:RegisterAdminComponent,
    title:'Đăng ký'
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
