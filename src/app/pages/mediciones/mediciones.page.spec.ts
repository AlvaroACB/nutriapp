import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicionesPage } from './mediciones.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('MedicionesPage', () => {
  let component: MedicionesPage;
  let fixture: ComponentFixture<MedicionesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    fixture = TestBed.createComponent(MedicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
