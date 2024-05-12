import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilerClientComponent } from './siler-client.component';

describe('SilerClientComponent', () => {
  let component: SilerClientComponent;
  let fixture: ComponentFixture<SilerClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SilerClientComponent]
    });
    fixture = TestBed.createComponent(SilerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
