import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsNewsComponent } from './add-details-news.component';

describe('AddDetailsNewsComponent', () => {
  let component: AddDetailsNewsComponent;
  let fixture: ComponentFixture<AddDetailsNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDetailsNewsComponent]
    });
    fixture = TestBed.createComponent(AddDetailsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
