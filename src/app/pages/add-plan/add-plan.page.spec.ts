import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlanPage } from './add-plan.page';

describe('AddPlanPage', () => {
  let component: AddPlanPage;
  let fixture: ComponentFixture<AddPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
