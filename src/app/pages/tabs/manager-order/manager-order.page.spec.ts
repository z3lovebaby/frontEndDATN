import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerOrderPage } from './manager-order.page';

describe('ManagerOrderPage', () => {
  let component: ManagerOrderPage;
  let fixture: ComponentFixture<ManagerOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
