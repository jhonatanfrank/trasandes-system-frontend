import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversReadComponent } from './drivers-read.component';

describe('DriversReadComponent', () => {
  let component: DriversReadComponent;
  let fixture: ComponentFixture<DriversReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
