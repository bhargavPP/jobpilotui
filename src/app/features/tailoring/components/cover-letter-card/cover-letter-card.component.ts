import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cover-letter-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cover-letter-card.component.html',
  styleUrls: ['./cover-letter-card.component.scss']
})
export class CoverLetterCardComponent {

  @Input({ required: true })
  coverLetter!: string;

  copied = false;

  async copyToClipboard(): Promise<void> {

    if (!this.coverLetter) {
      return;
    }

    await navigator.clipboard.writeText(this.coverLetter);

    this.copied = true;

    setTimeout(() => {

      this.copied = false;

    }, 2000);

  }

}
