import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailNewsComponent } from './update-detail-news.component';

describe('UpdateDetailNewsComponent', () => {
  let component: UpdateDetailNewsComponent;
  let fixture: ComponentFixture<UpdateDetailNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDetailNewsComponent]
    });
    fixture = TestBed.createComponent(UpdateDetailNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
