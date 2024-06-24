import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authguardGuard } from './guards/authguard.guard';

const routes: Routes = [
  {
    path: 'home2',
    loadChildren: () => import('./pages/home2/home2.module').then(m => m.Home2PageModule)
  },
  {
    path: '',
    redirectTo: 'home2',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [authguardGuard],
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then(m => m.ResumenPageModule)
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./pages/crear-usuario/crear-usuario.module').then(m => m.CrearUsuarioPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./pages/modificar-usuario/modificar-usuario.module').then(m => m.ModificarUsuarioPageModule)
  },
  // {
  //   path: 'resumen',
  //   loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule)
  // },
  // {
  //   path: 'plan-nutricional',
  //   loadChildren: () => import('./pages/plan-nutricional/plan-nutricional.module').then( m => m.PlanNutricionalPageModule)
  // },
  // {
  //   path: 'mediciones',
  //   loadChildren: () => import('./pages/mediciones/mediciones.module').then( m => m.MedicionesPageModule)
  // },
  // {
  //   path: 'datos-personales',
  //   loadChildren: () => import('./pages/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
