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
  rol!: string;
  sexo!: string;
  correo!: string;
  clave!: string;
  fecha_nacimiento!: string;

  // id_current_user2: number = 7;
  // username2: string = "Andre";
  // nombre2: string = "Andreita";
  // apellido2: string = "Monsalve";
  // rol2: string = "Paciente";
  // sexo2: string = "Femenino";
  // correo2: string = "andrea@gmail.com";
  // clave2: string = "1234";
  // fecha_nacimiento2: string = "01-01-2000";


  constructor(private servicioBD: DbserviceService) { }

  ngOnInit() {
    this.id_current_user = Number(localStorage.getItem("token"));
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarios().subscribe(item => {
          for (var i = 0; i < item.length; i++) {
            if (this.id_current_user == item[i].id_usuario) {
              this.username = item[i].username,
                this.nombre = item[i].nombre,
                this.apellido = item[i].apellido,
                this.rol = item[i].rol,
                this.sexo = item[i].sexo,
                this.correo = item[i].mail,
                this.clave = item[i].clave,
                this.fecha_nacimiento = item[i].fecha_nacimiento
            }
          }
        })
      }
    });
  }

  actualizar() {
    this.servicioBD.updateUsuario(this.id_current_user, this.username, this.nombre, this.apellido, this.rol, this.sexo, this.correo, this.clave, this.fecha_nacimiento)
    // this.servicioBD.presentToast("datos actualizados");
  }


}
