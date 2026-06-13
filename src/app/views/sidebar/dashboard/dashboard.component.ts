import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenciasVencerComponent } from './licencias-vencer/licencias-vencer.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { EstadoViajesComponent } from './estado-viajes/estado-viajes.component';
import { EstadoViajesResumenComponent } from './estado-viajes-resumen/estado-viajes-resumen.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, EstadoViajesComponent, LicenciasVencerComponent, InfoCardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
