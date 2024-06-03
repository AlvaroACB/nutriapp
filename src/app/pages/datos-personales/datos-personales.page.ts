import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
  providers: [provideNativeDateAdapter()],
})
export class DatosPersonalesPage implements OnInit {

  alertButtons = ['Action'];

  nombre: string = "";
  apellido: string = "";
  clave: string = "1234";
  correo: string = "";
  fechaNacimiento: Date = new Date();
  sexo: string = "";

  constructor() { }

  ngOnInit() {
  }

  verDatos() {
    if (this.nombre != "" && this.correo != "") {
      return "Hola " + this.nombre + " " + this.apellido + ". Tu correo es " + this.correo
    } else if (this.nombre != "") {
      return "Hola " + this.nombre + " " + this.apellido
    } else {
      return "No hay datos ingresados."
    }
  }

  limpiar() {
    this.nombre = "";
    this.apellido = "";
    this.correo = "";
    this.sexo = ""
  }

}
