import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home2Page } from './home2.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Home2Page', () => {
  let component: Home2Page;
  let fixture: ComponentFixture<Home2Page>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    fixture = TestBed.createComponent(Home2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
