import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendations-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations-card.component.html',
  styleUrls: ['./recommendations-card.component.scss']
})
export class RecommendationsCardComponent {

  @Input()
  recommendations: string[] = [];

}
