import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesReadComponent } from './vehicles-read.component';

describe('VehiclesReadComponent', () => {
  let component: VehiclesReadComponent;
  let fixture: ComponentFixture<VehiclesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
