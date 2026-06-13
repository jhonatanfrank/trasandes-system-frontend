import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciasVencerComponent } from './licencias-vencer.component';

describe('LicenciasVencerComponent', () => {
  let component: LicenciasVencerComponent;
  let fixture: ComponentFixture<LicenciasVencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenciasVencerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenciasVencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
