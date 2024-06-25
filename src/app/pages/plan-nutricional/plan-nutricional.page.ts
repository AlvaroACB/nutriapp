import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-plan-nutricional',
  templateUrl: './plan-nutricional.page.html',
  styleUrls: ['./plan-nutricional.page.scss'],
})
export class PlanNutricionalPage implements OnInit {

  usuarioPlan = {
    desCarbos: "1 porción",
    desProte: "1 porción",
    desLacteos: "1 porción",
    almCarbos: "2 porciones",
    almProte: "2 porciones",
    almVerduras: "2 porciones",
    cenCarbos: "1 porción",
    cenProte: "2 porciones",
    cenVerduras: "2 porciones",
  }
  username!: any;
  categoria: any = {
    idCategory: "",
    strCategory: "",
    strCategoryThumb: "",
    strCategoryDescription: "",
  }
  categorias: any;
  compareWith: any;

  constructor(private api: ApiService) { }

  // ionViewWillEnter() {
  //   this.llamarCategorias();
  // }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.llamarCategorias();
  }

  llamarCategorias() {
    this.api.getCategorias().subscribe((data) => {
      this.categorias = data.categories;
    });
  }

  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

}
