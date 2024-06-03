import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  nombreUsuario = "";
  usuario = {
    sexo: "Masculino",
    rangoEtario: "Adulto",
    diagnostico: "Paciente estado nutricional normopeso en base a IMC. Moderado nivel de masa grasa y alto nivel de masa muscular.",
    fechaUltimoControl: new Date("2024-01-15"),
    fechaProximoControl: new Date("2025-01-15"),
  };

  constructor(private router: Router, private activedRouter1: ActivatedRoute) {
    this.activedRouter1.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombreUsuario = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
      }
    })
  }

  ngOnInit() {
  }

}
