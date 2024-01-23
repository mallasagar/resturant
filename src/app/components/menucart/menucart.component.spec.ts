import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucartComponent } from './menucart.component';

describe('MenucartComponent', () => {
  let component: MenucartComponent;
  let fixture: ComponentFixture<MenucartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenucartComponent]
    });
    fixture = TestBed.createComponent(MenucartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
