import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAboutusComponent } from './update-aboutus.component';

describe('UpdateAboutusComponent', () => {
  let component: UpdateAboutusComponent;
  let fixture: ComponentFixture<UpdateAboutusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAboutusComponent]
    });
    fixture = TestBed.createComponent(UpdateAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
