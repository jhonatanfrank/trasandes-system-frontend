import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversUpdateComponent } from './drivers-update.component';

describe('DriversUpdateComponent', () => {
  let component: DriversUpdateComponent;
  let fixture: ComponentFixture<DriversUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
