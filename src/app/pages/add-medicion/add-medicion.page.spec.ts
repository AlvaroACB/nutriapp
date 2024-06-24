import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMedicionPage } from './add-medicion.page';

describe('AddMedicionPage', () => {
  let component: AddMedicionPage;
  let fixture: ComponentFixture<AddMedicionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
