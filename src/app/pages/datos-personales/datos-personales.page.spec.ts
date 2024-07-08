import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPersonalesPage } from './datos-personales.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DatosPersonalesPage', () => {
  let component: DatosPersonalesPage;
  let fixture: ComponentFixture<DatosPersonalesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    fixture = TestBed.createComponent(DatosPersonalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
