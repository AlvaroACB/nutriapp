import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario = "";

  constructor(private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
      }
    })
  }

  ngOnInit() {
  }

  redirigir1() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuarioEnviado: this.usuario
      }
    }
    this.router.navigate(['/home/resumen'], navigationExtras)
  }

  redirigir2() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuarioEnviado: this.usuario
      }
    }
    this.router.navigate(['/home/mediciones'], navigationExtras)
  }
}

