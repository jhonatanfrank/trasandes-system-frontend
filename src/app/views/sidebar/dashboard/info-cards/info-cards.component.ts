import { Component, OnInit } from '@angular/core';
import { InfoCards } from 'src/app/models/dashboard';
import { DashboardService } from '../dashboard-api/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-cards',
  imports: [CommonModule],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss'
})
export class InfoCardsComponent implements OnInit {

  cards: InfoCards[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.loading = true;

    this.dashboardService.info_cards().subscribe({
      next: (res) => {
        this.cards = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getCardClass(index: number): string {
    const classes = [
      'border-primary',
      'border-success',
      'border-warning',
      'border-info'
    ];

    return classes[index % classes.length];
  }

  getTextClass(index: number): string {
    const classes = [
      'text-primary',
      'text-success',
      'text-warning',
      'text-info'
    ];

    return classes[index % classes.length];
  }
}