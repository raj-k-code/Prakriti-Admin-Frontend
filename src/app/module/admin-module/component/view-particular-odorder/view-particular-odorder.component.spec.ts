import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticularOdorderComponent } from './view-particular-odorder.component';

describe('ViewParticularOdorderComponent', () => {
  let component: ViewParticularOdorderComponent;
  let fixture: ComponentFixture<ViewParticularOdorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParticularOdorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticularOdorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
