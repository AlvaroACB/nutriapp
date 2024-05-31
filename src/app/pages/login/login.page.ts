import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  v_usuario: string = "";
  v_password: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirigir() {
    let navigationExtras: NavigationExtras = {
      state: {
        v_usuarioEnviado: this.v_usuario
      }
    }
    this.router.navigate(['/home'], navigationExtras)
  }

}
