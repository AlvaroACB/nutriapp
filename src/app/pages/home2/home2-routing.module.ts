import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home2Page } from './home2.page';

const routes: Routes = [
  {
    path: '',
    component: Home2Page,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'crear-usuario',
        loadChildren: () => import('../crear-usuario/crear-usuario.module').then(m => m.CrearUsuarioPageModule)
      },
      {
        path: 'add-medicion',
        loadChildren: () => import('../add-medicion/add-medicion.module').then(m => m.AddMedicionPageModule)
      },
      {
        path: 'modificar-usuario',
        loadChildren: () => import('../modificar-usuario/modificar-usuario.module').then(m => m.ModificarUsuarioPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Home2PageRoutingModule { }
