import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMedicionPage } from './add-medicion.page';

const routes: Routes = [
  {
    path: '',
    component: AddMedicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMedicionPageRoutingModule {}
