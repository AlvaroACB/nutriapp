import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearUsuarioPage } from './crear-usuario.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CrearUsuarioPage', () => {
  let component: CrearUsuarioPage;
  let fixture: ComponentFixture<CrearUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    fixture = TestBed.createComponent(CrearUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
