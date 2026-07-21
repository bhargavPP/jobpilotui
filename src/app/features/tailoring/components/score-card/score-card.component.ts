import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent {

  @Input() title = '';

  @Input() value = 0;

  get scoreLabel(): string {

    if (this.value >= 90) return 'Excellent';

    if (this.value >= 75) return 'Good';

    if (this.value >= 60) return 'Fair';

    return 'Needs Work';

  }

  get scoreClass(): string {

    if (this.value >= 90) return 'excellent';

    if (this.value >= 75) return 'good';

    if (this.value >= 60) return 'fair';

    return 'poor';

  }

}
