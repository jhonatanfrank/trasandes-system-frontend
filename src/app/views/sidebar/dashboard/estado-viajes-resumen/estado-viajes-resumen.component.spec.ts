import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoViajesResumenComponent } from './estado-viajes-resumen.component';

describe('EstadoViajesResumenComponent', () => {
  let component: EstadoViajesResumenComponent;
  let fixture: ComponentFixture<EstadoViajesResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoViajesResumenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoViajesResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
