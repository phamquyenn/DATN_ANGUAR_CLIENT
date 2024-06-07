import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNewComponent } from './detail-new.component';

describe('DetailNewComponent', () => {
  let component: DetailNewComponent;
  let fixture: ComponentFixture<DetailNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailNewComponent]
    });
    fixture = TestBed.createComponent(DetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
