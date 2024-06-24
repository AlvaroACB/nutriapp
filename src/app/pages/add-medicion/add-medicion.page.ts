import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-add-medicion',
  templateUrl: './add-medicion.page.html',
  styleUrls: ['./add-medicion.page.scss'],
})
export class AddMedicionPage implements OnInit {

  fk_usuario = 0;
  peso = 0;
  talla = 0;
  grasa = 0;
  musculo = 0;
  fecha_medicion = "";
  fecha_prox_medicion = "";

  constructor(private dbservice: DbserviceService, private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.fk_usuario = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
      }
    })
  }

  ngOnInit() {
  }

  crearMedicion() {
    this.dbservice.addMedicion(this.fk_usuario, this.peso, this.talla, this.grasa, this.musculo, this.fecha_medicion, this.fecha_prox_medicion);
    this.dbservice.presentToast("Medicion agregada");
    this.router.navigate(['/home2']);
  }

}
