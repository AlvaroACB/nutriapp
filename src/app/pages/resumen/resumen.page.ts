import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  id_current_user!: any;
  username!: string;
  nombre!: string;
  apellido!: string;
  sexo!: string;
  peso!: number;
  talla!: number;
  grasa!: number;
  musculo!: number;

  imcNum!: number;
  imc!: string;
  grasa_porc!: string;
  musculo_porc!: string;
  estado_nutricional!: string;

  constructor(private servicioBD: DbserviceService) {
  }

  ngOnInit() {
    this.id_current_user = localStorage.getItem("token");
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchUsuarios().subscribe(item => {
          for (var i = 0; i < item.length; i++) {
            if (this.id_current_user == item[i].id_usuario) {
              this.username = item[i].username,
                this.nombre = item[i].nombre,
                this.apellido = item[i].apellido
              this.sexo = item[i].sexo
            }
          }
        })
        this.servicioBD.fetchMediciones().subscribe(item2 => {
          for (var i = 0; i < item2.length; i++) {
            if (this.id_current_user == item2[i].id_usuario_fk) {
              this.peso = item2[i].peso,
                this.talla = item2[i].talla,
                this.grasa = item2[i].grasa,
                this.musculo = item2[i].musculo
            }
          }
        })
      }
    });
    this.imc = (this.peso / ((this.talla / 100) * (this.talla / 100))).toFixed(2);
    this.grasa_porc = ((this.grasa * 100) / this.peso).toFixed();
    this.musculo_porc = ((this.musculo * 100) / this.peso).toFixed();
    if (this.imcNum < 19.5) {
      this.estado_nutricional = "bajo peso"
    } else if (this.imcNum < 25) {
      this.estado_nutricional = "normopeso"
    } else if (this.imcNum < 30) {
      this.estado_nutricional = "sobrepeso"
    } else {
      this.estado_nutricional = "obesidad"
    }
    localStorage.setItem("imc", this.imc)
    localStorage.setItem("grasa_porcentaje", this.grasa_porc)
    localStorage.setItem("musculo_porcentaje", this.musculo_porc)
    localStorage.setItem("estado_nutricional", this.estado_nutricional)
    localStorage.setItem("username", this.username)
  }

}
