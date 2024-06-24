import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
  providers: [provideNativeDateAdapter()],
})
export class DatosPersonalesPage implements OnInit {

  alertButtons = ['Action'];
  id_current_user!: any;
  username: string = "";
  nombre!: string;
  apellido!: string;
  sexo!: string;
  clave!: string;
  correo: string = "holis@gmail.com";

  constructor(private servicioBD: DbserviceService) { }

  ngOnInit() {
    this.id_current_user = localStorage.getItem("token");
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarios().subscribe(item => {
          for (var i = 0; i < item.length; i++) {
            if (this.id_current_user == item[i].id_usuario) {
              this.username = item[i].username,
                this.nombre = item[i].nombre,
                this.apellido = item[i].apellido,
                this.sexo = item[i].sexo,
                this.clave = item[i].clave
            }
          }
        })
      }
    });
  }

  // verDatos() {
  //   if (this.nombre != "" && this.correo != "") {
  //     return "Hola " + this.nombre + " " + this.apellido + ". Tu correo es " + this.correo
  //   } else if (this.nombre != "") {
  //     return "Hola " + this.nombre + " " + this.apellido
  //   } else {
  //     return "No hay datos ingresados."
  //   }
  // }

  // limpiar() {
  //   this.nombre = "";
  //   this.apellido = "";
  //   this.correo = "";
  //   this.sexo = ""
  // }

}
