import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'plan-nutricional',
        loadChildren: () => import('../plan-nutricional/plan-nutricional.module').then(m => m.PlanNutricionalPageModule)
      },
      {
        path: 'mediciones',
        loadChildren: () => import('../mediciones/mediciones.module').then(m => m.MedicionesPageModule)
      },
      {
        path: 'datos-personales',
        loadChildren: () => import('../datos-personales/datos-personales.module').then(m => m.DatosPersonalesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
