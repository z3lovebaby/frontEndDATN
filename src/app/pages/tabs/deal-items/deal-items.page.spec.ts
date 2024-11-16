import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealItemsPage } from './deal-items.page';

describe('DealItemsPage', () => {
  let component: DealItemsPage;
  let fixture: ComponentFixture<DealItemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DealItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
