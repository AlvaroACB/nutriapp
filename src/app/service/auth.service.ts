import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: boolean = true;

  constructor() { }

  isAuth() {
    return this.token;
  }

}
