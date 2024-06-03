import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  password: string = "";
  isToastOpen = false;

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
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

  redirigir() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuarioEnviado: this.usuario
      }
    }
    if (this.usuario.length <= 8 && this.usuario.length >= 3) {
      if (this.password.toString().length == 4) {
        this.router.navigate(['/home'], navigationExtras)
      } else {
        this.mensajePassword('top');
      }
    } else {
      this.mensajeUsuario('top');
    }
  }


}

