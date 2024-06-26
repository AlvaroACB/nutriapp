import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {
  usuarios: any = [{
    id_usuario: 0,
    username: "Juanito123",
    nombre: "Juanito",
    apellido: "Perez",
    rol: "test",
    sexo: "none",
    mail: "test@gmail.com",
    clave: "1234",
    fecha_nacimiento: "01-01-2000",
  }]
  mediciones: any = [{
    fk_usuario: 6,
    peso: 1,
    talla: 2,
    grasa: 3,
    musculo: 4,
    fecha_medicion: '15-06-2015',
    fecha_prox_medicion: '15-06-2030',
  }]

  constructor(private router: Router, private servicioBD: DbserviceService) { }

  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarios().subscribe(item => {
          this.usuarios = item;
        })
        this.servicioBD.fetchMediciones().subscribe(item2 => {
          this.mediciones = item2;
        })
      }
    });
  }

  getItem($event: any) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
  }

  addMedicion(item2: any) {
    let navigationextras: NavigationExtras = {
      state: {
        idEnviado: item2.id_usuario
      }
    }
    this.router.navigate(['/home2/add-medicion'], navigationextras);
  }

  addPlan(item: any) {
    let navigationextras: NavigationExtras = {
      state: {
        idEnviado: item.id_usuario
      }
    }
    this.router.navigate(['/home2/add-plan'], navigationextras);
  }

  // editar(item: any) {
  //   this.servicioBD.presentToast("Hola");
  //   let navigationextras: NavigationExtras = {
  //     state: {
  //       idEnviado: item.id_usuario,
  //       usernameEnviado: item.username,
  //       nombreEnviado: item.nombre,
  //       apellidoEnviado: item.apellido,
  //       rolEnviado: item.rol,
  //       sexoEnviado: item.sexo,
  //       mailEnviado: item.mail,
  //       claveEnviada: item.clave,
  //       fechaEnviada: item.fecha_nacimiento,
  //     }
  //   }
  //   this.servicioBD.presentToast("Aqui");
  //   this.router.navigate(['/home2/modificar-usuario'], navigationextras);
  // }

  eliminar(item: any) {
    this.servicioBD.deleteUsuario(item.id_usuario);
    this.servicioBD.presentToast("Usuario Eliminado");
  }

}
