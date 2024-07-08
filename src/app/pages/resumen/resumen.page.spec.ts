import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenPage } from './resumen.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ResumenPage', () => {
  let component: ResumenPage;
  let fixture: ComponentFixture<ResumenPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    fixture = TestBed.createComponent(ResumenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
