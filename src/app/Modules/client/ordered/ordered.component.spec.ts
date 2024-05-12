import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedComponent } from './ordered.component';

describe('OrderedComponent', () => {
  let component: OrderedComponent;
  let fixture: ComponentFixture<OrderedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderedComponent]
    });
    fixture = TestBed.createComponent(OrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
