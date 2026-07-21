import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApplicationService } from '../../services/application.service';
import { ApplicationDetails } from '../../models/application.models';

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
