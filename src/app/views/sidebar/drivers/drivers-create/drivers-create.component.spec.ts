import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversCreateComponent } from './drivers-create.component';

describe('DriversCreateComponent', () => {
  let component: DriversCreateComponent;
  let fixture: ComponentFixture<DriversCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
