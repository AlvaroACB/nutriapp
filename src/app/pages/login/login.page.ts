import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  idEnviado!: number;
  isToastOpen = false;
  usuariosdb: any = [{
    id_usuario: 0,
    username: "",
    nombre: "",
    apellido: "",
    rol: "",
    sexo: "",
    mail: "",
    clave: "",
    fecha_nacimiento: "",
  }]

  constructor(private servicioBD: DbserviceService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarios().subscribe(item => {
          this.usuariosdb = item;
        })
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async mensajeUsuario(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'El nombre de usuario debe tener entre 3 y 8 caracteres.',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }
  async mensajePassword(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'La contraseña debe tener 4 dígitos.',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

  validar() {
    for (var i = 0; i < this.usuariosdb.length; i++) {
      if (this.username == this.usuariosdb[i].username) {
        if (this.password == this.usuariosdb[i].clave) {
          localStorage.setItem('token', this.usuariosdb[i].id_usuario)
          let navigationExtras: NavigationExtras = {
            state: {
              idEnviado: this.usuariosdb[i].id_usuario
            }
          }
          if (this.usuariosdb[i].rol == 'Nutricionista') {
            this.router.navigate(['/home2/admin'], navigationExtras)
          } else if (this.usuariosdb[i].rol == "Paciente") {
            this.router.navigate(['/home/resumen'], navigationExtras)
          } else {
            this.router.navigate(['/home/resumen'], navigationExtras)
          }
        } else {
          this.servicioBD.presentToast("Contraseña incorrecta");
        }
      }
    }
    // this.servicioBD.presentToast("Usuario no encontrado");
  }



}

