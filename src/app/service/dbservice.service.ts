import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../service/usuario';
import { Medicion } from '../service/medicion';

@Injectable({ providedIn: 'root' })

export class DbserviceService {
  public database!: SQLiteObject;

  deleteTableUsuario: string = "DROP TABLE usuario";

  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, username VARCHAR(50) NOT NULL, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, rol VARCHAR(20) NOT NULL, sexo VARCHAR(20) NOT NULL, mail VARCHAR(50) NOT NULL, clave VARCHAR(20) NOT NULL, fecha_nacimiento VARCHAR(100) NOT NULL);";

  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario, username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento) VALUES (1, 'AlvaroCB', 'Alvaro', 'Cañete', 'Nutricionista', 'Masculino', 'alvaro@gmail.com', 'alvaro123', '16-09-1995');";

  listaUsuarios = new BehaviorSubject([]);

  deleteTableMedicion: string = "DROP TABLE medicion";

  tablaMediciones: string = "CREATE TABLE IF NOT EXISTS medicion(id_medicion INTEGER PRIMARY KEY autoincrement, id_usuario_fk INTEGER NOT NULL, peso INTEGER NOT NULL, talla INTEGER NOT NULL, grasa INTEGER NOT NULL, musculo INTEGER NOT NULL, fecha_medicion VARCHAR(100) NOT NULL, fecha_prox_medicion VARCHAR(100) NOT NULL);";

  registroMedicion: string = "INSERT or IGNORE INTO medicion(id_medicion, id_usuario_fk, peso, talla, grasa, musculo, fecha_medicion, fecha_prox_medicion) VALUES (1, 1, 78, 172, 15, 40, '01-01-2024', '01-01-2025');";

  listaMediciones = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
  }

  // Funciones CRUD 

  async addUsuario(username: string, nombre: string, apellido: string, rol: string, sexo: string, mail: string, clave: string, fecha_nacimiento: string) {
    let data = [username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento];
    return this.database?.executeSql('INSERT INTO usuario(username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento) VALUES(?,?,?,?,?,?,?,?)', data)
      .then(res => {
        this.buscarUsuarios();
      })
  }

  async addMedicion(id_usuario_fk: number, peso: number, talla: number, grasa: number, musculo: number, fecha_medicion: string, fecha_prox_medicion: string) {
    let data = [id_usuario_fk, peso, talla, grasa, musculo, fecha_medicion, fecha_prox_medicion];
    return this.database?.executeSql('INSERT INTO medicion(id_usuario_fk, peso, talla, grasa, musculo, fecha_medicion, fecha_prox_medicion) VALUES(?,?,?,?,?,?,?)', data)
      .then(res => {
        this.buscarMediciones();
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
      // await this.database.executeSql(this.deleteTableUsuario, [])
      // await this.database.executeSql(this.deleteTableMedicion, [])
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaMediciones, [])
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroMedicion, [])
      this.presentToast("Tabla Creada");
      this.buscarUsuarios();
      this.buscarMediciones();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("error creartabla " + e);
    }
  }

  async buscarUsuarios() {
    return this.database?.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
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
      this.listaUsuarios.next(items as any);
    });
  }

  async buscarMediciones() {
    return this.database?.executeSql('SELECT * FROM medicion', []).then(res => {
      let items2: Medicion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items2.push({
            id_medicion: res.rows.item(i).id_medicion,
            id_usuario_fk: res.rows.item(i).id_usuario_fk,
            peso: res.rows.item(i).peso,
            talla: res.rows.item(i).talla,
            grasa: res.rows.item(i).grasa,
            musculo: res.rows.item(i).musculo,
            fecha_medicion: res.rows.item(i).fecha_medicion,
            fecha_prox_medicion: res.rows.item(i).fecha_prox_medicion,
          });
        }
      }
      this.listaMediciones.next(items2 as any);
    });
  }

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchMediciones(): Observable<Medicion[]> {
    return this.listaMediciones.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}