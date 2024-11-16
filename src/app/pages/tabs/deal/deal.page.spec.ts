import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealPage } from './deal.page';

describe('DealPage', () => {
  let component: DealPage;
  let fixture: ComponentFixture<DealPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
