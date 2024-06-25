import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
  providers: [provideNativeDateAdapter()],
})
export class CrearUsuarioPage implements OnInit {

  username = "";
  nombre = "";
  apellido = "";
  rol = "";
  clave = "";
  mail = "";
  sexo = "";
  fecha_nacimiento = "";
  // peso = 0;
  // talla = 0;
  // grasa = 0;
  // musculo = 0;
  // des_carbo = 0;
  // des_prote = 0;
  // des_lacte = 0;
  // des_fruta = 0;
  // alm_carbo = 0;
  // alm_prote = 0;
  // alm_verdu = 0;
  // alm_fruta = 0;
  // onc_carbo = 0;
  // onc_prote = 0;
  // onc_lacte = 0;
  // onc_fruta = 0;
  // cen_carbo = 0;
  // cen_prote = 0;
  // cen_verdu = 0;
  // cen_fruta = 0;

  constructor(private dbservice: DbserviceService, private router: Router) { }

  ngOnInit() {
  }

  crearUsuario() {
    this.dbservice.addUsuario(this.username, this.nombre, this.apellido, this.rol, this.sexo, this.mail, this.clave, this.fecha_nacimiento);
    this.dbservice.presentToast("Usuario creado");
    this.router.navigate(['/home2/admin']);
  }

}
