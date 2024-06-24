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


  constructor(private servicioBD: DbserviceService, private router: Router, private activedRouter1: ActivatedRoute) {
    // this.activedRouter1.queryParams.subscribe(param => {
    //   if (this.router.getCurrentNavigation()?.extras.state) {
    //     this.nombreUsuario = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
    //   }
    // })
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
            }
          }
        })
      }
    });
  }

}
