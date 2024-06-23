import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  username = "";
  nombre = "";
  apellido = "";
  clave = "";
  correo = "";
  sexo = "";
  fecha_nacimiento = "";
  peso = 0;
  talla = 0;
  grasa = 0;
  musculo = 0;
  des_carbo = 0;
  des_prote = 0;
  des_lacte = 0;
  des_fruta = 0;
  alm_carbo = 0;
  alm_prote = 0;
  alm_verdu = 0;
  alm_fruta = 0;
  onc_carbo = 0;
  onc_prote = 0;
  onc_lacte = 0;
  onc_fruta = 0;
  cen_carbo = 0;
  cen_prote = 0;
  cen_verdu = 0;
  cen_fruta = 0;

  constructor() { }

  ngOnInit() {
  }

  crearUsuario() {

  }

}
