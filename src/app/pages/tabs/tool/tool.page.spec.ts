import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolPage } from './tool.page';

describe('ToolPage', () => {
  let component: ToolPage;
  let fixture: ComponentFixture<ToolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
