import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMedicionPageRoutingModule } from './add-medicion-routing.module';

import { AddMedicionPage } from './add-medicion.page';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMedicionPageRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [AddMedicionPage]
})
export class AddMedicionPageModule { }
