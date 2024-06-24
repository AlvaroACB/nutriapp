import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearUsuarioPageRoutingModule } from './crear-usuario-routing.module';
import { CrearUsuarioPage } from './crear-usuario.page';
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
    CrearUsuarioPageRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [CrearUsuarioPage]
})
export class CrearUsuarioPageModule { }
