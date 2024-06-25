import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  imageSource: any = "assets/icon/manzana.png";

  constructor() { }

  ngOnInit() {
  }

}
