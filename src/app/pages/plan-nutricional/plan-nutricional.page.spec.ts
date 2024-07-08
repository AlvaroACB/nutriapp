import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanNutricionalPage } from './plan-nutricional.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PlanNutricionalPage', () => {
  let component: PlanNutricionalPage;
  let fixture: ComponentFixture<PlanNutricionalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, SQLite],
    });
    fixture = TestBed.createComponent(PlanNutricionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
