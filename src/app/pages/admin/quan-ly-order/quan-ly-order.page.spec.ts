import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyOrderPage } from './quan-ly-order.page';

describe('QuanLyOrderPage', () => {
  let component: QuanLyOrderPage;
  let fixture: ComponentFixture<QuanLyOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
