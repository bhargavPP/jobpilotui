import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApplicationService } from '../../services/application.service';
import { ApplicationDetails } from '../../models/application.models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly applicationService = inject(ApplicationService);

  application?: ApplicationDetails;

  loading = true;

  statuses = [
    'Saved',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
    'Withdrawn'
  ];

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Application Id:', id);
    if (!id)
      return;

    this.applicationService
      .getApplication(id)
      .subscribe({
        next: app => {
          this.application = app;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  saveStatus(): void {

    if (!this.application)
      return;

    this.applicationService
      .updateStatus(
        this.application.id,
        this.application.status
      )
      .subscribe();
  }
}
