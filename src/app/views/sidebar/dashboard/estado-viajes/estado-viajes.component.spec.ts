import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoViajesComponent } from './estado-viajes.component';

describe('EstadoViajesComponent', () => {
  let component: EstadoViajesComponent;
  let fixture: ComponentFixture<EstadoViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoViajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
