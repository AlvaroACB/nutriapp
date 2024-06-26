import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-plan-nutricional',
  templateUrl: './plan-nutricional.page.html',
  styleUrls: ['./plan-nutricional.page.scss'],
})
export class PlanNutricionalPage implements OnInit {

  id_current_user!: any;
  d_car: number = 0;
  d_pro: number = 0;
  d_lac: number = 0;
  d_fru: number = 0;
  a_car: number = 0;
  a_pro: number = 0;
  a_ver: number = 0;
  a_fru: number = 0;
  o_car: number = 0;
  o_pro: number = 0;
  o_lac: number = 0;
  o_fru: number = 0;
  c_car: number = 0;
  c_pro: number = 0;
  c_ver: number = 0;
  c_fru: number = 0;
  test1: number = 1;
  test2: number = 2;

  // usuarioPlan = {
  //   desCarbos: "1 porción",
  //   desProte: "1 porción",
  //   desLacteos: "1 porción",
  //   almCarbos: "2 porciones",
  //   almProte: "2 porciones",
  //   almVerduras: "2 porciones",
  //   cenCarbos: "1 porción",
  //   cenProte: "2 porciones",
  //   cenVerduras: "2 porciones",
  // }
  username!: any;
  categoria: any = {
    idCategory: "",
    strCategory: "",
    strCategoryThumb: "",
    strCategoryDescription: "",
  }
  categorias: any;
  compareWith: any;

  constructor(private api: ApiService, private servicioBD: DbserviceService) { }

  // ionViewWillEnter() {
  //   this.llamarCategorias();
  // }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.llamarCategorias();
    this.id_current_user = localStorage.getItem("token");
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchPlan().subscribe(item => {
          for (var i = 0; i < item.length; i++) {
            if (this.id_current_user == item[i].id_usuario_fk) {
              this.d_car = item[i].d_car,
                this.d_pro = item[i].d_pro,
                this.d_lac = item[i].d_lac,
                this.d_fru = item[i].d_fru,

                this.a_car = item[i].a_car,
                this.a_pro = item[i].a_pro,
                this.a_ver = item[i].a_ver,
                this.a_fru = item[i].a_fru,

                this.o_car = item[i].o_car,
                this.o_pro = item[i].o_pro,
                this.o_lac = item[i].o_lac,
                this.o_fru = item[i].o_fru,

                this.c_car = item[i].c_car,
                this.c_pro = item[i].c_pro,
                this.c_ver = item[i].c_ver,
                this.c_fru = item[i].c_fru
            }
          }
        })
      }
    });
  }

  llamarCategorias() {
    this.api.getCategorias().subscribe((data) => {
      this.categorias = data.categories;
    });
  }

  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  porcion(item: any) {
    if (item == 1) {
      return "porción";
    } else if (item == 2) {
      return "porciones";
    } else {
      return "";
    }
  }

}
