import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  id_current_user!: any;
  peso!: number;
  talla!: number;
  grasa!: number;
  musculo!: number;
  imc!: any;
  grasa_porc!: any;
  musculo_porc!: any;
  estado_nutricional!: any;
  username!: any;

  constructor(private servicioBD: DbserviceService) {

  }

  ngOnInit() {
    this.id_current_user = localStorage.getItem("token");
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchMediciones().subscribe(item => {
          for (var i = 0; i < item.length; i++) {
            if (this.id_current_user == item[i].id_usuario_fk) {
              this.peso = item[i].peso,
                this.talla = item[i].talla,
                this.grasa = item[i].grasa,
                this.musculo = item[i].musculo
            }
          }
        })
      }
    });
    this.grasa_porc = localStorage.getItem("grasa_porcentaje");
    this.musculo_porc = localStorage.getItem("musculo_porcentaje");
    this.imc = localStorage.getItem("imc");
    this.estado_nutricional = localStorage.getItem("estado_nutricional");
    this.username = localStorage.getItem("username");
  }

}
