import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  // 2 - Creamos una variable que sirve de objeto json
  httpOptions = {
    headers: new HttpHeaders({
      //q tipo de mensaje vamos a transaccionar, en este caso es json
      'Content-Type': 'application/json',
      //permite relizar solicitudes a los servicios con menos dificultades
      'Access-Control-Allow-Origin': '*'
    })
  }

  //3 - Definimos la api a consumir dentro de una variable 
  // Comentario: En esta api funciona solo Get, pero con una bbdd debería funcionar todo
  apiURL = "https://www.themealdb.com/api/json/v1/1/categories.php";

  constructor(private http: HttpClient) { }

  //4 - Definiendo funciones que voy a necesitar

  //4.1 - Fn que llama un usuario en específico
  // getCategoria(cat_id: any): Observable<any> {
  //   return this.http.get(this.apiURL + '/categories/' + cat_id).pipe(retry(3));
  // }
  // 4.2 - Fn que llama todos los usuarios
  getCategorias(): Observable<any> {
    return this.http.get(this.apiURL).pipe(retry(3));
  }

}
