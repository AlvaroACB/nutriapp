import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  fk_usuario = 0;
  d_car = 0;
  d_pro = 0;
  d_lac = 0;
  d_fru = 0;
  a_car = 0;
  a_pro = 0;
  a_ver = 0;
  a_fru = 0;
  o_car = 0;
  o_pro = 0;
  o_lac = 0;
  o_fru = 0;
  c_car = 0;
  c_pro = 0;
  c_ver = 0;
  c_fru = 0;

  constructor(private dbservice: DbserviceService, private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.fk_usuario = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
      }
    })
  }

  ngOnInit() {
  }

  crearPlan() {
    this.dbservice.addPlan(this.fk_usuario, this.d_car, this.d_pro, this.d_lac, this.d_fru, this.a_car, this.a_pro, this.a_ver, this.a_fru, this.o_car, this.o_pro, this.o_lac, this.o_fru, this.c_car, this.c_pro, this.c_ver, this.c_fru);
    this.dbservice.presentToast("Plan creado");
    this.router.navigate(['/home2/admin']);
  }

  aum1() {
    this.d_car = this.d_car + 1;
  }
  dis1() {
    this.d_car = this.d_car - 1;
  }
  aum2() {
    this.d_pro = this.d_pro + 1;
  }
  dis2() {
    this.d_pro = this.d_pro - 1;
  }
  aum3() {
    this.d_lac = this.d_lac + 1;
  }
  dis3() {
    this.d_lac = this.d_lac - 1;
  }
  aum4() {
    this.d_fru = this.d_fru + 1;
  }
  dis4() {
    this.d_fru = this.d_fru - 1;
  }
  aum5() {
    this.a_car = this.a_car + 1;
  }
  dis5() {
    this.a_car = this.a_car - 1;
  }
  aum6() {
    this.a_pro = this.a_pro + 1;
  }
  dis6() {
    this.a_pro = this.a_pro - 1;
  }
  aum7() {
    this.a_ver = this.a_ver + 1;
  }
  dis7() {
    this.a_ver = this.a_ver - 1;
  }
  aum8() {
    this.a_fru = this.a_fru + 1;
  }
  dis8() {
    this.a_fru = this.a_fru - 1;
  }
  aum9() {
    this.o_car = this.o_car + 1;
  }
  dis9() {
    this.o_car = this.o_car - 1;
  }
  aum10() {
    this.o_pro = this.o_pro + 1;
  }
  dis10() {
    this.o_pro = this.o_pro - 1;
  }
  aum11() {
    this.o_lac = this.o_lac + 1;
  }
  dis11() {
    this.o_lac = this.o_lac - 1;
  }
  aum12() {
    this.o_fru = this.o_fru + 1;
  }
  dis12() {
    this.o_fru = this.o_fru - 1;
  }
  aum13() {
    this.c_car = this.c_car + 1;
  }
  dis13() {
    this.c_car = this.c_car - 1;
  }
  aum14() {
    this.c_pro = this.c_pro + 1;
  }
  dis14() {
    this.c_pro = this.c_pro - 1;
  }
  aum15() {
    this.c_ver = this.c_ver + 1;
  }
  dis15() {
    this.c_ver = this.c_ver - 1;
  }
  aum16() {
    this.c_fru = this.c_fru + 1;
  }
  dis16() {
    this.c_fru = this.c_fru - 1;
  }

}
