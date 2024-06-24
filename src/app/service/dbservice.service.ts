import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../service/usuario';

@Injectable({ providedIn: 'root' })

export class DbserviceService {
  public database!: SQLiteObject;

  deleteTableUsuario: string = "DROP TABLE usuario";

  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, username VARCHAR(50) NOT NULL, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, rol VARCHAR(20) NOT NULL, sexo VARCHAR(20) NOT NULL, mail VARCHAR(50) NOT NULL, clave VARCHAR(20) NOT NULL, fecha_nacimiento VARCHAR(100) NOT NULL);";

  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario, username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento) VALUES (1, 'AlvaroCB', 'Alvaro', 'Cañete', 'Nutricionista', 'Masculino', 'alvaro@gmail.com', 'alvaro123', '16-09-1995');";

  listaUsuarios = new BehaviorSubject([]); private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
  }

  async addUsuario(username: string, nombre: string, apellido: string, rol: string, sexo: string, mail: string, clave: string, fecha_nacimiento: string) {
    let data = [username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento];
    return this.database?.executeSql('INSERT INTO usuario(username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento) VALUES(?,?,?,?,?,?,?,?)', data)
      .then(res => {
        this.buscarUsuarios();
      })
  }

  async updateUsuario(id_usuario: any, username: any, nombre: any, apellido: any, rol: any, sexo: any, mail: any, clave: any, fecha_nacimiento: any) {
    let data = [username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento, id_usuario];
    return this.database.executeSql('UPDATE usuario SET username = ?, nombre = ?, apellido = ?, rol = ?, sexo = ?, mail = ?, clave = ?, fecha_nacimiento = ?, WHERE id_usuario = ?', data)
      .then(data2 => {
        this.buscarUsuarios();
      })
  }

  async deleteUsuario(id_usuario: any) {
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario])
      .then(a => {
        this.buscarUsuarios();
      })
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'nutriapp.db',
        location: 'default'
      })?.then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD Creada");
        this.crearTablas();
      }).catch(e => this.presentToast("Error bbdd" + e));
    })
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.deleteTableUsuario, [])
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.registroUsuario, []);
      this.presentToast("Tabla Creada");
      this.buscarUsuarios();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("error creartabla " + e);
    }
  }

  async buscarUsuarios() {
    //this.presentAlert("a"); 
    return this.database?.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {
        //this.presentAlert("c"); 
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            username: res.rows.item(i).username,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            rol: res.rows.item(i).rol,
            sexo: res.rows.item(i).sexo,
            mail: res.rows.item(i).mail,
            clave: res.rows.item(i).clave,
            fecha_nacimiento: res.rows.item(i).fecha_nacimiento,
          });
        }
      }
      //this.presentAlert("d"); 
      this.listaUsuarios.next(items as any);
    });
  }

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}