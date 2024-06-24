import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
  }

}
