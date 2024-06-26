import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../service/usuario';
import { Medicion } from '../service/medicion';
import { Plan } from '../service/plan';

@Injectable({ providedIn: 'root' })

export class DbserviceService {
  public database!: SQLiteObject;

  deleteTableUsuario: string = "DROP TABLE IF EXISTS usuario";

  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, username VARCHAR(50) NOT NULL, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, rol VARCHAR(20) NOT NULL, sexo VARCHAR(20) NOT NULL, mail VARCHAR(50) NOT NULL, clave VARCHAR(20) NOT NULL, fecha_nacimiento VARCHAR(100) NOT NULL);";

  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario, username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento) VALUES (1, 'AlvaroCB', 'Alvaro', 'Cañete', 'Nutricionista', 'Masculino', 'alvaro@gmail.com', '1234', '16-09-1995');";

  listaUsuarios = new BehaviorSubject([]);

  deleteTableMedicion: string = "DROP TABLE IF EXISTS medicion";

  tablaMediciones: string = "CREATE TABLE IF NOT EXISTS medicion(id_medicion INTEGER PRIMARY KEY autoincrement, id_usuario_fk INTEGER NOT NULL, peso INTEGER NOT NULL, talla INTEGER NOT NULL, grasa INTEGER NOT NULL, musculo INTEGER NOT NULL, fecha_medicion VARCHAR(100) NOT NULL, fecha_prox_medicion VARCHAR(100) NOT NULL);";

  registroMedicion: string = "INSERT or IGNORE INTO medicion(id_medicion, id_usuario_fk, peso, talla, grasa, musculo, fecha_medicion, fecha_prox_medicion) VALUES (1, 1, 78, 172, 15, 40, '01-01-2024', '01-01-2025');";

  listaMediciones = new BehaviorSubject([]);

  deleteTablePlan: string = "DROP TABLE IF EXISTS plan";

  tablaPlan: string = "CREATE TABLE IF NOT EXISTS plan(id_plan INTEGER PRIMARY KEY autoincrement, id_usuario_fk INTEGER NOT NULL, d_car INTEGER, d_pro INTEGER, d_lac INTEGER, d_fru INTEGER, a_car INTEGER, a_pro INTEGER, a_ver INTEGER, a_fru INTEGER, o_car INTEGER, o_pro INTEGER, o_lac INTEGER, o_fru INTEGER, c_car INTEGER, c_pro INTEGER, c_ver INTEGER, c_fru INTEGER);";

  registroPlan: string = "INSERT or IGNORE INTO plan(id_plan, id_usuario_fk, d_car, d_pro, d_lac, d_fru, a_car, a_pro, a_ver, a_fru, o_car, o_pro, o_lac, o_fru, c_car, c_pro, c_ver, c_fru) VALUES (1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);";

  listaPlan = new BehaviorSubject([]);

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

  async addPlan(id_usuario_fk: number, d_car: number, d_pro: number, d_lac: number, d_fru: number, a_car: number, a_pro: number, a_ver: number, a_fru: number, o_car: number, o_pro: number, o_lac: number, o_fru: number, c_car: number, c_pro: number, c_ver: number, c_fru: number) {
    let data = [id_usuario_fk, d_car, d_pro, d_lac, d_fru, a_car, a_pro, a_ver, a_fru, o_car, o_pro, o_lac, o_fru, c_car, c_pro, c_ver, c_fru];
    return this.database?.executeSql('INSERT INTO plan(id_usuario_fk, d_car, d_pro, d_lac, d_fru, a_car, a_pro, a_ver, a_fru, o_car, o_pro, o_lac, o_fru, c_car, c_pro, c_ver, c_fru) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data)
      .then(res => {
        this.buscarPlan();
      })
  }

  async updateUsuario(id_usuario: any, username: any, nombre: any, apellido: any, rol: any, sexo: any, mail: any, clave: any, fecha_nacimiento: any) {
    this.presentToast("ejecutando función");
    let data = [username, nombre, apellido, rol, sexo, mail, clave, fecha_nacimiento, id_usuario];
    return this.database.executeSql('UPDATE usuario SET username = ?, nombre = ?, apellido = ?, rol = ?, sexo = ?, mail = ?, clave = ?, fecha_nacimiento = ? WHERE id_usuario = ?', data)
      .then(data2 => {
        this.presentToast("usuario actualizado");
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
      await this.database.executeSql(this.deleteTableMedicion, [])
      await this.database.executeSql(this.deleteTablePlan, [])
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaMediciones, []);
      await this.database.executeSql(this.tablaPlan, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroMedicion, []);
      await this.database.executeSql(this.registroPlan, [])
      this.presentToast("Tabla Creada");
      this.buscarUsuarios();
      this.buscarMediciones();
      this.buscarPlan();
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

  async buscarPlan() {
    return this.database?.executeSql('SELECT * FROM plan', []).then(res => {
      let items3: Plan[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items3.push({
            id_plan: res.rows.item(i).id_plan,
            id_usuario_fk: res.rows.item(i).id_usuario_fk,
            d_car: res.rows.item(i).d_car,
            d_pro: res.rows.item(i).d_pro,
            d_lac: res.rows.item(i).d_lac,
            d_fru: res.rows.item(i).d_fru,
            a_car: res.rows.item(i).a_car,
            a_pro: res.rows.item(i).a_pro,
            a_ver: res.rows.item(i).a_ver,
            a_fru: res.rows.item(i).a_fru,
            o_car: res.rows.item(i).o_car,
            o_pro: res.rows.item(i).o_pro,
            o_lac: res.rows.item(i).o_lac,
            o_fru: res.rows.item(i).o_fru,
            c_car: res.rows.item(i).c_car,
            c_pro: res.rows.item(i).c_pro,
            c_ver: res.rows.item(i).c_ver,
            c_fru: res.rows.item(i).c_fru,
          });
        }
      }
      this.listaPlan.next(items3 as any);
    });
  }

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchMediciones(): Observable<Medicion[]> {
    return this.listaMediciones.asObservable();
  }

  fetchPlan(): Observable<Plan[]> {
    return this.listaPlan.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  guardNutricionista() {
    let rol = localStorage.getItem('rolusu');
    if (rol == 'Nutricionista') {
      return true;
    } else {
      return false;
    }
  }

  guardPaciente() {
    let rol = localStorage.getItem('rolusu');
    if (rol == 'Paciente') {
      return true;
    } else {
      return false;
    }
  }
}